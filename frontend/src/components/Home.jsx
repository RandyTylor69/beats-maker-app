import Pads from "./Pads";
import Tasks from "./Tasks";

export default function Home() {
  return (
    <div className="web-body">
      <section className="action-area">
        <Pads />
      </section>
      <section className="task-area">
        <Tasks />
      </section>
    </div>
  );
}
