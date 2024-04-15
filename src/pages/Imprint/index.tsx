import { Box, Typography } from "@mui/material";
import React from "react";
import '../../styles/imPrint.scss'

const Imprint = () => {
  return (
    <Box className='imPrintContent'>
      <Typography variant="h1">Impressum</Typography>
      <Typography>Angaben gemäß § 5 TMG:</Typography>
      <Typography>
        Apfelherz Handels GmbH <br /> Hauptstraße 117
        <br /> 10827 Berlin
      </Typography>
      <Box>
        <Typography variant="h2">Vertreten durch:</Typography>
        <Typography>
          Geschäftsführer: Jeremias Müller | Kaan Tekyaygil
        </Typography>
      </Box>
      <Box>
        <Typography variant="h2">Kontakt:</Typography>
        <Typography>Telefon: +49 30 887 10 233</Typography>
        <Typography>Telefax: +49 30 887 10 232</Typography>
      </Box>
      <Typography>E-Mail: office@jemix.de</Typography>
      <Box>
        <Typography variant="h2">Registereintrag:</Typography>
        <Typography>Eintragung im HandelsregisterRegistergericht:</Typography>
        <Typography>Amtsgericht Berlin Charlottenburg Registernummer: HRB 233399 B</Typography>
      </Box>
      <Box>
        <Typography variant="h2">Umsatzsteuer-ID:</Typography>
        <Typography>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE347049901</Typography>
      </Box>
      <Box>
        <Typography variant="h2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</Typography>
        <Typography>Jeremias Müller <br/>Hauptstraße 117<br/>10827 Berlin</Typography>
      </Box>
        <Typography>Haftungsausschluss (Disclaimer)</Typography>
      <Box>
        <Typography variant="h2">Haftung für Inhalte:</Typography>
        <Typography>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.<br/>
Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</Typography>
      </Box>
      <Box>
        <Typography variant="h2">Haftung für Links:</Typography>
        <Typography>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.<br/>
Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</Typography>
      </Box>
      <Box>
        <Typography variant="h2">Urheberrecht:</Typography>
        <Typography>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.<br/>
Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</Typography>
      </Box>
      <Box>
        <Typography variant="h2">Hinweis:</Typography>
        <Typography>Die EU-Kommission bietet die Möglichkeit zur Online-Streitbeilegung auf einer von ihr betriebenen Online-Plattform. Diese Plattform ist über den externen Link zu erreichen.</Typography>
      </Box>
    </Box>
  );
};

export default Imprint;
