const axios = require('axios');
const core = require('@actions/core');

const DEFAULT_CHARACTER = 'dr-zoidberg';

const AVAILABLE_CHARACTERS = [
  'bender',
  'leela',
  'fry',
  'dr-zoidberg'
];

async function run () {
  const character = core.getInput('character') || DEFAULT_CHARACTER;
  // Debugging needs the ACTIONS_STEP_DEBUG secret set as env 
  core.debug(`[Futurama] Input character: ${character}`);

  if(!AVAILABLE_CHARACTERS.includes(character)) {
    core.setFailed(`Unknown character ${character}`); // Withoyt setFailed the GH action will let the workflow continue
    return; 
  }

  core.debug(`[Futurama] Fetching quote for: ${character}`);
  const response = await axios.get(`https://futuramaapi.herokuapp.com/api/characters/${character}/1`);
  core.debug(`[Futurama] Fetched quote for: ${character}`);
  const { data } = response;
  core.debug(`[Futurama] Data: ${JSON.stringify(data)}`);
  const firstEntry = data[0];
  console.log(`${firstEntry.character}: ${firstEntry.quote}`);
  core.setOutput('quote', firstEntry);
}

run();