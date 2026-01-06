import Image from "next/image";

import { getAllTrainings } from "@/lib/api.ts";

const TrainingPage = async () => {
  const trainingSessions = await getAllTrainings();
  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training, idx) => (
          <li key={training.id}>
            <div className="img-wrapper">
              <Image
                src={`/trainings${training.image}`}
                alt={training.title}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fill
                sizes='(max-width: 768px) 100vw, 33vw'

              />
            </div>
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TrainingPage;