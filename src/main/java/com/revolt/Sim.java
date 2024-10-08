package com.revolt;

import java.net.URI;
import java.net.URISyntaxException;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Sim {

  private void boot() {

    log.info("Booting charger");

    try {

      WebSocketClient cc = new WebSocketClient(new URI("ws://localhost:8080/ocpp1.6/12345ABCD")) {

        @Override
        public void onMessage(String message) {
          log.info("onMessage: " + message);
        }

        @Override
        public void onOpen(ServerHandshake handshake) {

          log.info("onOpen: " + handshake.toString());

          this.send(
              "[2, \"19223201\", \"BootNotification\", {\"chargePointVendor\": \"VendorX\", \"chargePointModel\": \"SingleSocketCharger\"} ]");
        }

        @Override
        public void onClose(int code, String reason, boolean remote) {
          log.info("onClose: " + reason);
        }

        @Override
        public void onError(Exception ex) {
          log.info("onError: " + ex.getMessage());
        }
      };

      cc.connect();

    } catch (URISyntaxException e) {
      e.printStackTrace();
    }

  }

  public static void main(String[] args) {
    new Sim().boot();
  }
}
