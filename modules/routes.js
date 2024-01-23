import adminRouter from "./admin/routes.js";
import sliderRouter from "./slider/routes.js";
import Services from "./services/index.js";
import generalRouter from "./general/routes.js";
import langRouter from "./lang/routes.js";
import homeRouter from "./home/routes.js";
import aboutRouter from "./about/routes.js";
import treatmentRouter from "./treatment/routes.js";
import treatmentPageRouter from "./treatmentPage/routes.js";
import contactRouter from "./contact/routes.js";
import translateRouter from "./translate/routes.js";
import featureRouter from "./feature/routes.js";
import groupRouter from "./group/routes.js";
import faqRouter from "./faq/routes.js";
import reservationRouter from "./reservation/routes.js";
import referenceLogoRouter from "./referenceLogo/routes.js";
import healthRouter from "./health/routes.js";
import stepRouter from "./step/routes.js";


import reviewRouter from "./review/routes.js";

export default function (app) {
  app.use("/admin", adminRouter);
  app.use("/slider", sliderRouter);
  app.use("/lang", langRouter);
  app.use("/home", homeRouter);
  app.use("/feature", featureRouter);
  app.use("/referenceLogo", referenceLogoRouter);

  app.use("/group", groupRouter);
  app.use("/faq", faqRouter);
  app.use("/review", reviewRouter);
  app.use("/reservation", reservationRouter);


  app.use("/about", aboutRouter);
  app.use("/treatment", treatmentRouter);
  app.use("/services", Services.router);
  app.use("/general", generalRouter);
  app.use("/treatmentpage", treatmentPageRouter);
  app.use("/contact", contactRouter);
  app.use("/translate", translateRouter);
  app.use("/health", healthRouter);
  app.use("/step", stepRouter);


  app.get("/", async (req, res) => {
    return res.json({ message: "Hello World !" });
  });
}
