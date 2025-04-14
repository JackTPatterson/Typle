import axios from "axios";
import { redirect } from "next/navigation";

export const saveTest = async (test: {
    uuid: string,
    time: number,
    prompt: string,
    accuracy: number,
    wpm: number
}) => {
    const data = JSON.stringify({
        "uuid": test.uuid,
        "time": Math.floor(test.time / 1000),
        "prompt": test.prompt,
        "accuracy": test.accuracy,
        "wpm": test.wpm
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/user/${test.uuid}/score`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json'
        },

        data : data
    };

    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });

}
