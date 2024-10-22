import WebSocket from 'ws'

export function startMessagingBridge() {

    const ws = new WebSocket('ws://localhost:8080/ocpp1.6/12345ABCD');

    ws.on('error', console.error);

    ws.on('open', function open() {

        console.info('open')

        ws.send("[2, \"19223201\", \"BootNotification\", {\"chargePointVendor\": \"VendorX\", \"chargePointModel\": \"SingleSocketCharger\"} ]")
    });

    ws.on('message', function message(data: string) {

        console.log('received: %s', data);
    });

    ws.on('close', function close() {
        console.log('close')
    })

}