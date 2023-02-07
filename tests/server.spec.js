const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  it("Devolucion de status code 200 con dato array", async () => {
    const {statusCode: status, body: cafes} = await request(server).get("/cafes").send()
    expect(status).toBe(200);
    expect(cafes).toBeInstanceOf(Array);
  });

  it("codigo 404 al eliminar cafe con id que no existe", async () => {
    const jwt = "token";
    const coffeid = 123456789; 
    const { statusCode: status } = await request(server)
      .delete(`/cafes/${coffeid}`)
      .set("Authorization", jwt)
      .send();
    expect(status).toBe(404);  
  });
  
  it("Agregar Post /cafes con nuevo cafe y devuelve codigo 201", async () => {
    const id = Math.floor(Math.random() * 999);
    const coffe = { id, nombre: "New Coffe"};
    const { statusCode: status } = await request(server)
      .post("/cafes")
      .send(coffe);
    expect(status).toBe(201)
  });

  it("Ruta Put /cafes devuelve 404 si actualizamos un cafe con id diferente al id del payload", async () => {
    const notId = 1313;
    const coffe = {id: 1212, nombre: "frapuccino"}
    const { statusCode: status } = await request(server)
      .put(`/cafes/${notId}`)
      .send(coffe);
    expect(status).toBe(400);
  })
});
