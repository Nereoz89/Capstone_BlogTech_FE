const Hero: any = () => {
  return (
    <div>
      <div className="hero min-h-[68vh] flex items-center justify-center bg-gray-100 px-4  mx-auto backdrop:blur-md">
        <div className="flex items-center justify-center flex-col text-center">
          <h1 className="text-4xl md:text-3xl lg:text-6xl text-blue-900 font-extrabold">
            BlogTech <br /> Naviga il presente, scopri il domani.
          </h1>
          <p className="text-lg text-blue-800 my-10 text-  ">
            Tecnologia, innovazione, passione: benvenuto su BlogTech.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
