import {
  BONUS,
  ENLIST_OFFICER,
  ENLIST_WRITER,
  LUXURY,
  OFFICER_IN_TRAINING,
  POWER,
  PURCHASE_LUXURY,
  PURCHASE_SHIPYARD,
  PURCHASE_WORKSHOP,
  SEEK_SHARE,
  SHARE,
  SHIPYARD,
  TAX,
  WORKSHOP,
  WRITER,
} from '../../constants';
import { tplIcon, tplPolicyIcon } from '../../icons/templates';
import { JocoLawCard } from '../../types';
import { tplCardText } from '../utility';

const lawCardHeaderText = (header: string) => {
  switch (header) {
    case 'dilemma':
      return _('Dilemma before Parliament');
    case 'special':
      return _('Special Session of Parliament');
    default:
      return _('Law before Parliament');
  }
};

const tplInitialSupport = (votes: number) => `
  <div class="joco-icon" data-icon="VoteClear">
    <div class="joco-initial-support-icon" data-initial-support='${votes}'></div>
  </div>
`;

const POLICY_TARGET_ICON_MAP = {
  [BONUS]: 'Bonus',
  [POWER]: 'Power',
  [TAX]: 'Tax',
  [WORKSHOP]: 'Manufacturing',
  [SHARE]: 'CompanyShare',
  [SHIPYARD]: 'Shipping',
  [LUXURY]: 'Social',
};

const EXTRA_ACTION_ICON_MAP = {
  [ENLIST_WRITER]: WRITER,
  [ENLIST_OFFICER]: OFFICER_IN_TRAINING,
  [PURCHASE_LUXURY]: LUXURY,
  [PURCHASE_SHIPYARD]: SHIPYARD,
  [PURCHASE_WORKSHOP]: WORKSHOP,
  [SEEK_SHARE]: SHARE,
};

export const tplDeregulation = () => `
  <div class="joco-deregulation-1 fb-font-baskerville fb-font-8 fb-font-italic bga-autofit">${_('At the start of a turn, the Prime Minister may call a session of Parliament to vote on this law if either Standing or Debt is on a lined space. If either piece is on a space with a star, the session must be called. In either case, no policy is proposed.')}</div>
  <div class="joco-deregulation-2 fb-font-baskerville fb-font-8 fb-font-italic bga-autofit">${_('The initial support of the law depends on the status of Standing and Debt:')}</div>
  
`

export const tplLawCardContent = (card: JocoLawCard) => `
  <div class="joco-header fb-font-baskerville  fb-font-16 fb-font-italic bga-autofit">${lawCardHeaderText(card.header)}</div>
  <div class="joco-title fb-font-bebas-neue fb-font-40 bga-autofit">${_(card.title).toLocaleUpperCase()}</div>
  ${tplCardText(card.text, { textClass: 'fb-font-16 fb-font-baskerville' })}
  ${card.initialSupport !== null ? tplInitialSupport(card.initialSupport) : ''}
  ${card.policyTarget !== null && POLICY_TARGET_ICON_MAP[card.policyTarget] ? tplPolicyIcon(POLICY_TARGET_ICON_MAP[card.policyTarget]) : ''}
  ${card.policyConsequence !== null && POLICY_TARGET_ICON_MAP[card.policyConsequence] ? tplPolicyIcon(POLICY_TARGET_ICON_MAP[card.policyConsequence]) : ''}
  ${card.extraAction !== null && EXTRA_ACTION_ICON_MAP[card.extraAction] ? tplIcon(EXTRA_ACTION_ICON_MAP[card.extraAction], 'joco-extra-action-icon') : ''}
  ${card.extraActionText !== null ? `<div class="joco-extra-action-header fb-font-baskerville fb-font-italic fb-font-16">${_('Extra Action')}</div>` + tplCardText(card.extraActionText, { containerClass: 'joco-extra-action-text', textClass: 'fb-font-12 fb-font-baskerville' }) : ''}
  ${card.id === 'LawCard_56' ? tplDeregulation() : ''}
`;
