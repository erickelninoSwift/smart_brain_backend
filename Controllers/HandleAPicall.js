import dotenv from "dotenv";

dotenv.config();
const HandleAPIcall = (request, response) => {
  const { urlOfImage } = request.body;
  console.log(urlOfImage);
  const PAT = process.env.APP_KEY;

  const USER_ID = process.env.USER_ID;
  const APP_ID = process.env.APP_ID;
  const MODEL_ID = process.env.MODEL_ID;
  // const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

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
    method: "POST",
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
      console.log(result.outputs[0].data.regions[0].region_info);
      response.json(result);
    })
    .catch((error) => console.log("error", error));
};

export default HandleAPIcall;
