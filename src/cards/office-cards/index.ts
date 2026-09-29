import { JocoOfficeBase } from "../../types";
import { getOffice } from "../../utility";

export const tplOfficeCard = (data: JocoOfficeBase) => {
  const office = getOffice(data);
  return `
    <div id="OfficeCard_${data.id}" class="joco-office-card" style="order: ${office.hirePriority}">
      <div class="joco-header joco-office-header">
        <span class="fb-font-baskerville fb-font-16">${office.title}</span></div>
      </div>
    </div>
  `;
};