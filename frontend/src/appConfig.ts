export const region = "us-central1"

const productionFunctionsUrl = `https://us-central1-knowcheck-4cbab.cloudfunctions.net/`;
const emulatorFunctionsUrl = `http://localhost:5001/knowcheck-4cbab/us-central1/`;

export default function appConfig(){
    const nodeEnv = process.env.NODE_ENV || 'development';
    return {
        RPC_URL: (nodeEnv === 'development'?emulatorFunctionsUrl:productionFunctionsUrl).replace(/\/+/g,'/').replace(/\/$/g,'')
    }
}