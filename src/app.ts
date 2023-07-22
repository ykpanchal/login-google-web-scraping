import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routes/auth.route";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use("/api/auth", authRouter);

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Implement OAuth in Node.js",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = 800;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
