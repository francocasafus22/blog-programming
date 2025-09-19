import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <header className="md:h-[80vh] pt-16 md:pt-0 bg-background flex items-center justify-center ">
        <div className="flex flex-col md:flex-row md:items-center w-9/10 lg:w-4/5 max-w-7xl">
          {/* Columna izquierda: texto */}
          <div className="md:w-1/2 flex flex-col justify-center items-center mx-auto">
            <h1 className="text-6xl font-black text-center md:text-start">
              Convierte{" "}
              <span className="bg-accent-gradient bg-clip-text text-transparent">
                tus ideas
              </span>{" "}
              en{" "}
              <span className="bg-accent-gradient bg-clip-text text-transparent">
                proyectos web
              </span>{" "}
              desde cero
            </h1>
            <h2 className="text-2xl text-primary mt-4 text-center md:text-start">
              Aprende a desarrollar proyectos web con cursos y tutoriales
              gratuitos para desarrollar apps, bases de datos, APIs y sitios web
              desde cero.
            </h2>
            <Button variant="accent" className="md:self-start mt-5 lg:mb-0">
              Ver Contenido
            </Button>
          </div>

          {/* Columna derecha: imagen */}
          <div className="md:w-1/2 flex items-center justify-center  h-80 md:h-full overflow-hidden">
            <img
              src="../../public/imageHero2.svg"
              alt=""
              className=" duration-200 md:max-w-3/4 object-cover h-full md:h-auto"
            />
          </div>
        </div>
      </header>

      <section>
        <h1>Hola</h1>
      </section>
    </>
  );
}
