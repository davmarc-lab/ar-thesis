const url = "wss://mqtt-broker-hostname:9001";
const topics = [
    "robots/+/position"
]
const opts = {
    protocol: "wss",
    clean: true,
    connectTimeout: 4000,
    rejectUnauthorized: true
}

// create an mqtt client with the given options
const broker = new MQTTBroker(url, opts);
// try to connect to the broker
// when it succeed it subscribes to the given topic list
broker.connect(topics);
