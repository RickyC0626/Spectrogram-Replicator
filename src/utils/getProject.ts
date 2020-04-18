import { titleStore, authorStore } from "../stores/project";
import { minFreqStore, maxFreqStore, audioLengthStore } from "../stores/audio";
import { linesStore } from "../stores/canvas";
import { get } from 'svelte/store'

export default function getProject() {
  const title = get(titleStore);
  const author = get(authorStore);
  const freqRange = [get(minFreqStore), get(maxFreqStore)];
  const audioLength = get(audioLengthStore);

  // Map<>.entries() returns an iterator of [key, value] pairs. Not an array.
  // we can do [...Map<>.entries()], but [...Map<>] does the same thing
  const linesMap = get(linesStore);
  const lines = [...linesMap]

  // yay for direct mutation! Easiest way of doing this.
  // line.segments is a Map<Symbol, Segment>, so this is necessary too
  for (const [_symbol, line] of lines) {
    line.segments = [...line.segments]
  }

  return {
    title,
    author,
    freqRange,
    audioLength,
    lines,
  }
}