import injectModule from "../injectModule";

export default async ({ input, output }) => {
  injectModule({
    input,
    output,
  });

  require("react-app-rewired/scripts/build");
};
