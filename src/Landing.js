import notes_landing from './img/notes_landing.png';

export default () => {
  return (
    <div>
      <div>
        <img src={notes_landing} alt="" />
      </div>
      <div>
        <h2 className="text-lg text-indigo-900">Online Sticky Notes</h2>
        <p className="text-indigo-900">
          Bring your team together for fun and effective remote meetings
        </p>
        <button className="border-indigo-900">Get Started &gt;</button>
      </div>
    </div>
  );
};
