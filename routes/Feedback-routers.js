import express from "express";
const FeedbackControllers =  require( "../controllers/feedback.controller"); 
export const FeedbackRouter = express.Router();


FeedbackRouter.post("/User-Feedback-Add",FeedbackControllers.CreateFeedback);
FeedbackRouter.post("/ShowAll-Feedback",FeedbackControllers.ShowAllFeedback );
FeedbackRouter.post("/Delete-Feedback",FeedbackControllers.DeleteFeedback);
