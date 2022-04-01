let port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765;
let express = require('express');
const cron = require('node-cron');
let Gun = require('gun');
require('isomorphic-fetch');
// require('gun/axe');


let app = express();
app.use(Gun.serve);
app.use("/", express.static("../dist"));

const myAddress = process.env.PUBLIC_ADDRESS || "http://localhost:" + port + "/gun";
let myCountry = process.env.COUNTRY || "UNKNOWN";
let myName = process.env.SERVER_NAME || "Dev Server";
let connectToOtherPeers = process.env.CONNECT_TO_PEERS || true;

if (!myAddress.startsWith("http")) {
    throw new Error("Public address should start with http(s)://");
} else if (!myAddress.endsWith("/gun")) {
    throw new Error("Public address should end with /gun")
}

let server = app.listen(port);
let gun = Gun({file: 'data', web: server});

console.log('Server started on port ' + port + ' with /gun');

app.get("/api/peers", async (req: Request, res: Response): Promise<Response> => {
        const peers = await gun.get("peers");
        // @ts-ignore
        return res.status(200).send({
            peers: peers,
        });
    }
);

app.post("/api/count", async (req: Request, res: Response): Promise<Response> => {
        let counter = await gun.get("poll-counter").get(myAddress);
        if (counter === undefined) {
            counter = 0;
        }
        counter = counter + 1;
        await gun.get("poll-counter").get(myAddress).put(counter)
        // @ts-ignore
        return res.status(200).send({counter});
    }
);

app.get("/api/count", async (req: Request, res: Response): Promise<Response> => {
        const value = await gun.get("poll-counter");
        let pollCount: number = 0;
        for (let valueKey in value) {
            if (valueKey !== "_") {
                // @ts-ignore
                const counter: number = await gun.get("poll-counter").get(valueKey).once(counter => counter);
                if (counter !== undefined) {
                    pollCount = pollCount + counter;
                }
            }
        }
        let myCount = await gun.get("poll-counter").get(myAddress);
        // @ts-ignore
        return res.status(200).send({
            total: pollCount,
            myHost: myCount,
        });
    }
);


if (connectToOtherPeers) {
    verifyOtherPeers().then(() => console.log("Initial verification success"))
    cron.schedule('0 0 * * *', () => verifyOtherPeers());
}

gun.get("peers").get(myAddress).put({status: "UP", name: myName, country: myCountry})

process.on('exit', function () { //IDK if this works
    console.log('About to exit.');
    gun.get("peers").get(myAddress).put({address: myAddress, status: "DOWN"})
});


async function verifyOtherPeers() {
    const allKeys = Object.keys(await gun.get("peers"));
    for (const key of allKeys) {
        if (key !== "_" && !key.includes("localhost")) { // Don't verify localhost
            const host = await gun.get(`peers/${key}`)
            // Check if peers are up
            fetch(key).then(res => {
                if (res.ok) {
                    if (host.status !== "UP") {
                        // Update GUN
                        gun.get(`peers/${key}`).put({status: "UP"})
                    }
                } else {
                    if (host.status !== "DOWN") {
                        // Update GUN
                        gun.get(`peers/${key}`).put({status: "DOWN"})
                    }
                }
            })

            // Check Country http://ip-api.com/json/gun.tetrisiq.de
            // sometime fetch throw an TypeError, but the request work
            fetch(`http://ip-api.com/json/${key.replace("http://", "").replace("https://", "").replace("/gun", "")}?fields=status,message,country,countryCode,timezone`).then(res => res.json()).then(async res => {
                if (res.status === "fail") {
                    console.log(res)
                } else {
                    // Update GUN
                    const tmp = await gun.get(`peers/${key}`).put({country: res.country})
                    console.log("RES", tmp)
                }
            })
        }
    }
    console.log("Verify other peers success")
}