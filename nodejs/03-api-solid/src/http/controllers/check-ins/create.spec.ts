import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Gym",
        latitude: -20.3562179,
        longitude: -40.278214,
        description: null,
        phone: null,
      });

    const gymsSearchResponse  = await request(app.server)
      .get("/gyms/search?q=Gym")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const gym = gymsSearchResponse.body.gyms[0];

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -20.3562179,
        longitude: -40.278214,
      });

    expect(response.statusCode).toEqual(201);
  });

});
