import injectModule from "../injectModule";

export default async ({ input, port }) => {
  const output = "./mf-build";
  injectModule({
    input,
    output,
  });

  if (port) {
    process.env.PORT = port;
  }

  require("react-app-rewired/scripts/start");
};
