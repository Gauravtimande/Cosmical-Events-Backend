import FCM from "fcm-node";
// import serverKey from "../firebase.json";
export const sendPushNotification = async(notificationData) => {
  const fcmServerkey = process.env.FCM_SERVER_KEY
  try {
    var fcm = new FCM(fcmServerkey);
    var message = {
      to: "cpU3oUS7u0geovFIN0p7y4:APA91bG2mmfh4NGTr9mycScpgZRRva07a_hXi6W48t8I02YBwC2LSBEWt1zecS7rftjimyxvZgb1JmI2uGE5nq-1JmqU9fOv2TtIZOWDwfTjH71SRU_MTJZVZW76jt2CN7XL_X9FMEBJ",
      // collapse_key: "your_collapse_key",
      notification: {
        title: "Title of your push notification",
        body: "Body of your push notification",
      },
    };
    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!");
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  } catch (error) {
    console.log("error", error);
  }
};
