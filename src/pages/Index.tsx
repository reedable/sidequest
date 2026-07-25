import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import css from "./Index.module.css";

interface Lesson {
  path: string;
  title: string;
  description: string;
}

const lessons: Lesson[] = [
  {
    path: "/the-world-was-split-three-ways",
    title: "The World Was Split Three Ways",
    description:
      "Three brothers drew straws for the world. Find out whether drawing first actually helped.",
  },
  {
    path: "/send-a-secret-message",
    title: "Send a Secret Message",
    description:
      "Write a note nobody else can read, and meet the wrap-around that makes it work.",
  },
];

export default function Index() {
  return (
    <Container className={css.Index} maxWidth="sm">
      <h1>Sidequest</h1>

      <p>Short detours into things worth knowing. Pick one.</p>

      <div className={css.Lessons}>
        {lessons.map((lesson) => (
          <Card key={lesson.path} elevation={2} className={css.Card}>
            <CardActionArea
              component={Link}
              to={lesson.path}
              className={css.CardActionArea}
            >
              <CardContent>
                <Typography component="h2" variant="h6" gutterBottom>
                  {lesson.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lesson.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Container>
  );
}
