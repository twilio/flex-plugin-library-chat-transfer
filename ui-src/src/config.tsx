
const cold_transfer = process.env.FLEX_APP_COLD_TRANSFER_FLAG || '<COLD_TRANSFER_FLAG>';

const multi_participant = process.env.FLEX_APP_MULTI_PARTICIPANT_FLAG || '<MULTI_PARTICIPANT_FLAG>';
export const isColdTransferEnabled = () => {
  let cold_transfer_bool = false;
  if (cold_transfer == 'Enable' || cold_transfer == 'enable' || cold_transfer == 'ENABLE') {
    cold_transfer_bool = true;
  }
  console.log('Cold Transfer Value', cold_transfer_bool);
  return cold_transfer_bool;
};

export const isMultiParticipantEnabled = () => {
  let multi_participant_bool = false;
  if (multi_participant == 'Enable' || multi_participant == 'enable' || multi_participant == 'ENABLE') {
    multi_participant_bool = true;
  }
  console.log('Multi Participant Value', multi_participant_bool);
  return multi_participant_bool;
};
