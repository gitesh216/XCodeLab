import axios from "axios";

const submitBatch = async (submissions) => {
    const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
        params: {
            base64_encoded: "false",
        },
        headers: {
            "x-rapidapi-key":
                "6e169a222amsh712a7e312f85e18p128d42jsn768c96fef1f6",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "Content-Type": "application/json",
        },
        data: {
            submissions
                // {
                //     source_code:
                //         "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(a + b);",
                //     language_id: 63,
                //     stdin: "100 200",
                //     expected_output: "300",
                // },
                // {
                //     source_code:
                //         "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(a + b);",
                //     language_id: 63,
                //     stdin: "-500 -600",
                //     expected_output: "-1100",
                // },
                // {
                //     source_code:
                //         "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(a + b);",
                //     language_id: 63,
                //     stdin: "0 0",
                //     expected_output: "0",
                // },
                // {
                //     language_id: 71,
                //     source_code: "cHJpbnQoImhlbGxvIGZyb20gUHl0aG9uIikK",
                // },
                // {
                //     language_id: 72,
                //     source_code: "cHV0cygiaGVsbG8gZnJvbSBSdWJ5IikK",
                // },
        },
    };
    try {
        const response = await axios.request(options);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log("Error in submitting batch", error.response.data);
    }
};

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const pollBatchResults = async (tokens) => {
    const options = {
        method: "GET",
        url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
        params: {
            tokens: tokens.join(","),
            base64_encoded: false,
            fields: "*",
        },
        headers: {
            "x-rapidapi-key":
                "6e169a222amsh712a7e312f85e18p128d42jsn768c96fef1f6",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        },
    };

    try {
        while (true) {
            const response = await axios.request(options);
            // console.log(response.data);

            const results = response.data.submissions;

            const isAllDone = results.every(
                (r) => r.status_id !== 1 && r.status_id !== 2,
            );

            if (isAllDone) return results;

            await sleep(1000);
        }
    } catch (error) {
        console.log("Error in polling batch results", error);
    }
};


export { submitBatch, pollBatchResults };