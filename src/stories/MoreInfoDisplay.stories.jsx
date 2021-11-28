import React from "react";
import MoreInfoDisplay from "features/MoreInfoDisplay";

export default {
  component: MoreInfoDisplay,
  title: "Features/MoreInfoDisplay",
};

export const Default = MoreInfoDisplay.bind({});
Default.args = {
  title: "Läs mer om romansbedrägerier",
  content: "<h2>Var aktsam när någon ber om pengar.</h2> Det behöver inte vara en 'familjemedlem' som skriver. Det kan vara någon som hackat sig in på en av dina kompisars eller kollegors konton och påstår sig vara dem.</br></br> Det kan även vara så att en bedragare har skapat ett konto som imiterar en av dina kompisar. De använder helt enkelt samma namn och bilder som kontot de låtsas vara.  <h2>Enkel lösning - ring upp!</h2> Innan du gör något vid en förfrågan från en ”familjemedlem” bör du bekräfta att personen verkligen är den som den utger sig för att vara. Ring upp hen direkt och stäm av. För aldrig över några pengar på direkt uppmaning via sociala medier. <h2>Romansbedrägeri</h2>Ifall någon du dejtat online ber om en stor summa pengar för exempelvis ett visum eller en flygbiljett bör du också vara försiktig - det kan vara en bedragare som vill åt dina pengar, och endast låtsats vara förälskad i dig. <b>Detta kallas romansbedrägeri.</b>",
  fixed: false
};
