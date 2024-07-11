import React from 'react';
import naftosBaze from '../assets/naftosbaze.jpg';
import pistoletai from '../assets/pistoletai.jpg';

const Home = () => {
  return (
    <>
      <div className="p-5 text-center text-red-500 text-5xl animate-fade-up animate-once animate-duration-2000 animate-ease-in mb-10">
        "UAB Skysčių <br /> perpylimo <br /> technologijos"
      </div>
      <div className="flex flex-col justify-center items-center h-auto m-10 gap-4">
        <div className="animate-fade-up animate-once animate-duration-2000 animate-ease-in animate-delay-500 flex flex-col md:flex-row items-center gap-4">
          <div className="md:order-2">
            <img
              src={naftosBaze}
              alt="Naftos Baze"
              className="w-64 h-64 object-cover rounded border-4 border-red-500"
            />
          </div>
          <div className="md:order-1">
            <p>
              Naftos bazės yra infrastruktūros objektai, <br />
              kurie yra atsakingi už naftos ir jos produktų saugojimą, tvarkymą ir paskirstymą. <br />
              Aptarnavimas naftos bazėse yra svarbus siekiant užtikrinti saugią ir efektyvią veiklą <br />
              bei laikytis visų reikiamų reguliavimo reikalavimų.
            </p>
          </div>
        </div>
        <div className="animate-fade-up animate-once animate-duration-2000 animate-ease-in animate-delay-1000 flex flex-col md:flex-row items-center gap-4">
          <div className="md:order-2 order-2">
            <p>
              Degalinės yra mažmeninės prekybos vietos, kuriose parduodami degalai, <br />
              tokie kaip benzinas, dyzelinas ir dujos, taip pat dažnai <br />
              siūlomos įvairios kitos paslaugos ir prekės.
            </p>
          </div>
          <div className="md:order-1 sm:order-1">
            <img
              src={pistoletai}
              alt="Pistoletai"
              className="w-64 h-64 object-cover rounded border-4 border-red-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
