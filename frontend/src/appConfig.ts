export const region = "us-central1";

const productionFunctionsUrl = `https://us-central1-knowcheck-4cbab.cloudfunctions.net/`;
const emulatorFunctionsUrl = `http://localhost:5001/knowcheck-4cbab/us-central1/`;

export default function appConfig() {
    const nodeEnv = import.meta.env.MODE || "development";
    return {
      RPC_URL: (nodeEnv === "development"
        ? emulatorFunctionsUrl
        : productionFunctionsUrl
      ).replace(/\/$/g, ""),
    };
  
}
