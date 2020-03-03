#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import {
  CosmosStack,
  GalaxyStack,
  CiCdSolarSystemStack,
  EcsSolarSystemStack
} from "@cdk-cosmos/core";

const app = new App();

const mgtEnvConfig = { account: "583682874749", region: "ap-southeast-2" };
const devEnvConfig = { account: "855215228333", region: "ap-southeast-2" };

const cosmos = new CosmosStack(app, "DemoCore", {
  tld: "cosmos.com",
  env: mgtEnvConfig
});

const mgtGalaxy = new GalaxyStack(cosmos, "Mgt", {
  cidr: "10.0.0.0/22"
});

const ciCd = new CiCdSolarSystemStack(mgtGalaxy, {
  cidr: mgtGalaxy.NetworkBuilder.addSubnet(24)
});

const devGalaxy = new GalaxyStack(cosmos, "Dev", {
  cidr: "10.0.1.0/22",
  env: devEnvConfig
});

// Enable Solar Systems after bootstrap

// const dev = new EcsSolarSystemStack(devGalaxy, "Dev", {
//   cidr: mgtGalaxy.NetworkBuilder.addSubnet(24)
// });

// const tst = new EcsSolarSystemStack(devGalaxy, "Tst");
