import axios from "axios";
import { Command } from "./Command";

export const ip: Command = function ({ channel }) {
  axios
    .get("https://api64.ipify.org?format=json")
    .then(({ data }) => {
      if (data.ip) {
        channel.send({
          content: `My IP is ${data.ip}`,
        });
      } else throw "Response object missing IP";
    })
    .catch((error) => {
      console.error(error);
      channel.send({
        content: "There was an error.",
      });
    });
};
