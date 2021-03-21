import notes_landing from './img/notes_landing.png';

export default () => {
  return (
    <div className="h-full">
      <div className="h-1/2">
        <img src={notes_landing} alt="" />
      </div>
      <div className="px-4">
        <h1 className="text-5xl text-indigo-900 pb-2">Online Sticky Notes</h1>
        <p className="text-xl text-indigo-900 py-4">
          Bring your team together for fun and effective remote meetings
        </p>
        <button className="mb-4 px-1 text-xl text-indigo-900 uppercase border border-1 border-indigo-900">
          Get Started &gt;
        </button>
      </div>
    </div>
  );
};
