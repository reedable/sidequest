import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Database } from 'sql.js'
import { SCHEMA_SQL } from './schema'

const DB_NAME = 'math-game'
const STORE_NAME = 'db'
const KEY = 'state'

interface DbContextValue {
  db: Database | null
  ready: boolean
}

const DbContext = createContext<DbContextValue>({ db: null, ready: false })

async function loadFromIndexedDB(): Promise<Uint8Array | null> {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME)
    }
    request.onsuccess = () => {
      const tx = request.result.transaction(STORE_NAME, 'readonly')
      const get = tx.objectStore(STORE_NAME).get(KEY)
      get.onsuccess = () => resolve(get.result ?? null)
      get.onerror = () => resolve(null)
    }
    request.onerror = () => resolve(null)
  })
}

async function saveToIndexedDB(data: Uint8Array): Promise<void> {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME)
    }
    request.onsuccess = () => {
      const tx = request.result.transaction(STORE_NAME, 'readwrite')
      tx.objectStore(STORE_NAME).put(data, KEY)
      tx.oncomplete = () => resolve()
    }
    request.onerror = () => resolve()
  })
}

export function DbProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<Database | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let database: Database | null = null

    async function init() {
      const SQL = await (
        await import('sql.js')
      ).default({
        locateFile: () => '/sql-wasm.wasm',
      })

      const saved = await loadFromIndexedDB()
      database = saved ? new SQL.Database(saved) : new SQL.Database()
      database.run(SCHEMA_SQL)

      await saveToIndexedDB(database.export())
      setDb(database)
      setReady(true)
    }

    init()

    return () => {
      database?.close()
    }
  }, [])

  useEffect(() => {
    if (!db) return
    const interval = setInterval(() => {
      saveToIndexedDB(db.export())
    }, 30_000)
    return () => clearInterval(interval)
  }, [db])

  return <DbContext value={{ db, ready }}>{children}</DbContext>
}

export function useDb() {
  return useContext(DbContext)
}
