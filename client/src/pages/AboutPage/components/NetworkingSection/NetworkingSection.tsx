import "./NetworkingSection.css";
import Line from "../../../../components/Line/Line";
import Affiliate from "../Affiliate/Affiliate";
import parseContent from "../../../../utils/parseContent";
import { AboutPageContent } from "../../AboutPage";

export interface NetworkingSectionProps {
  networkAffiliatesSectionImage: AboutPageContent["networkAffiliatesSectionImage"];
  networkAffiliatesSectionText: AboutPageContent["networkAffiliatesSectionText"];
  networkAffiliatesSectionLogos: AboutPageContent["networkAffiliatesSectionLogos"];
}

const NetworkingSection = ({
  networkAffiliatesSectionImage,
  networkAffiliatesSectionText,
  networkAffiliatesSectionLogos,
}: NetworkingSectionProps) => {
  return (
    <section className="networking-section">
      <h2 className="networking-title">Networking Affiliates</h2>
      <Line extraClass="networking-line" />
      <div className="networking-container">
        <div className="networking-image-container">
          <img
            src={networkAffiliatesSectionImage.url}
            alt={networkAffiliatesSectionImage.alternativeText}
            className="networking-image"
          />
        </div>
        <div className="networking-text-container">
          {parseContent(networkAffiliatesSectionText)}
        </div>
      </div>
      <div className="networking-affiliates-container">
        {!!networkAffiliatesSectionLogos &&
          networkAffiliatesSectionLogos.map((networkAffiliateLogo) => (
            <Affiliate
              key={networkAffiliateLogo.id}
              url={networkAffiliateLogo.url}
              alternativeText={networkAffiliateLogo.alternativeText}
            />
          ))}
      </div>
    </section>
  );
};

export default NetworkingSection;
