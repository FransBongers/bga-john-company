// import {
//   BENGAL_PRESIDENCY, BLACKMAIL, BOMBAY_PRESIDENCY, BONUSES,
//   CHAIRMAN, DIRECTOR_OF_TRADE, EVENTS_IN_INDIA, FAMILY, GOVERNOR_GENERAL,
//   GOVERNOR_OF_BENGAL, GOVERNOR_OF_BOMBAY, GOVERNOR_OF_DELHI,
//   GOVERNOR_OF_HYDERABAD, GOVERNOR_OF_MADRAS, GOVERNOR_OF_MARATHA,
//   GOVERNOR_OF_MYSORE, GOVERNOR_OF_PUNJAB, HIRING, LONDON_SEASON,
//   MADRAS_PRESIDENCY, MANAGER_OF_SHIPPING, MILITARY_AFFAIRS, PARLIAMENT_MEETS,
//   PRESIDENT_OF_BENGAL, PRESIDENT_OF_BOMBAY, PRESIDENT_OF_MADRAS,
//   REVENUE, SUPERINTENDENT_OF_TRADE_IN_CHINA, UPKEEP_AND_REFRESH,
// } from '../constants';

// const phases = [
//   LONDON_SEASON, FAMILY, HIRING, CHAIRMAN, DIRECTOR_OF_TRADE,
//   MANAGER_OF_SHIPPING, MILITARY_AFFAIRS, BOMBAY_PRESIDENCY,
//   MADRAS_PRESIDENCY, BENGAL_PRESIDENCY, BONUSES, REVENUE,
//   EVENTS_IN_INDIA, PARLIAMENT_MEETS, UPKEEP_AND_REFRESH,
// ];

// const indiaOffices = [
//   PRESIDENT_OF_BOMBAY, PRESIDENT_OF_MADRAS, PRESIDENT_OF_BENGAL,
//   GOVERNOR_GENERAL, GOVERNOR_OF_BOMBAY, GOVERNOR_OF_MADRAS,
//   GOVERNOR_OF_BENGAL, GOVERNOR_OF_PUNJAB, GOVERNOR_OF_DELHI,
//   GOVERNOR_OF_MARATHA, GOVERNOR_OF_HYDERABAD, GOVERNOR_OF_MYSORE,
// ];

// const londonOffices = [
//   CHAIRMAN, DIRECTOR_OF_TRADE, MANAGER_OF_SHIPPING, MILITARY_AFFAIRS,
//   SUPERINTENDENT_OF_TRADE_IN_CHINA,
// ];

// export interface AnytimeCardData {
//   playerId: number;
//   phase: string;
//   promiseCards: Array<{ id: string }>;
//   blackmailCards: Array<{ id: string; type: string; hiddenId?: string }>;
//   cashByPlayer: Record<number, number>;
//   occupiedOffices: string[];
// }

// export function getAnytimeCardIds(data: AnytimeCardData): string[] {
//   const phaseIndex = phases.indexOf(data.phase);
//   if (phaseIndex < 0) return [];

//   const eligible = data.promiseCards.filter(({ id }) => {
//     const [prefix, owner, type] = id.split('_');
//     return prefix === 'PC' && type === 'TakeTwoOrLessFromMe' &&
//       Number(owner) !== data.playerId && (data.cashByPlayer[Number(owner)] ?? 0) > 0;
//   }).map(({ id }) => id);

//   const afterRevenue = phaseIndex > phases.indexOf(REVENUE);
//   const beforeEvents = phaseIndex < phases.indexOf(EVENTS_IN_INDIA);

//   data.blackmailCards.forEach((card) => {
//     if (card.type !== BLACKMAIL || !card.hiddenId) return;
//     let canPlay = false;
//     switch (card.hiddenId) {
//       case 'EnvoyToTheMughals':
//         canPlay = beforeEvents;
//         break;
//       case 'ThePrimeMinistersEar':
//         canPlay = phaseIndex < phases.indexOf(FAMILY);
//         break;
//       case 'ScandalInIndia':
//         canPlay = afterRevenue && indiaOffices.some((office) => data.occupiedOffices.includes(office));
//         break;
//       case 'ScandalOnLeadenhallStreet':
//         canPlay = afterRevenue && londonOffices.some((office) => data.occupiedOffices.includes(office));
//         break;
//     }
//     if (canPlay) eligible.push(card.id);
//   });
//   return eligible;
// }