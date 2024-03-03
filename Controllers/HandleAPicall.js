import dotenv from "dotenv";

dotenv.config();

const HandleAPIcall = (request, response) => {
  const { urlOfImage } = request.body;

  const PAT = "6611bac68a7242638d73075acff0f5a7";

  const USER_ID = "jackpot11";
  const APP_ID = "jackpotSmartBrain";
  const MODEL_ID = "face-detection";

  const IMAGE_URL = urlOfImage;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "post",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  fetch(
    "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
    requestOptions
  )
    .then((alldata) => alldata.json())
    .then((result) => {
      response.json(result);
    })
    .catch((error) => console.log("error", error));
};

export default HandleAPIcall;
