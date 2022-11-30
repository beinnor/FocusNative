const secsInMmssString = (secs) => {
  const minutes = Math.floor(secs / 60);
  let seconds = secs % 60;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return minutes + ':' + seconds;
};

export { secsInMmssString };
