import React from 'react'

import styled from '@emotion/styled'
import { NextPage } from 'next'

import Footer from 'app/components/footer'
import Header from 'app/components/header'
import InfoPageLayout from 'app/components/info-page-layout'
import UlList from 'app/components/list'

const SubTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: 800;
`

const Text = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
`

const PrivacyPolicyPage: NextPage = () => (
  <>
    <Header />
    <InfoPageLayout heading='Privacy Policy'>
      <SubTitle>Data We Collect</SubTitle>
      <Text>
        Privacy is central to everything we do at the Company. And we&apos;ve enshrined transparency as one of our
        Company values. Accordingly, we aspire to be transparent about what little data we do collect. We do not
        maintain user accounts and do not collect and store personal data, such as your name or internet protocol (“IP”)
        address. When you interact with the Services, we collect only:
      </Text>
      <UlList>
        <li>
          Publicly-available blockchain data. When you connect your non-custodial blockchain wallet to the Services, we
          collect and log your publicly-available blockchain address to learn more about your use of the Services and to
          screen your wallet for any prior illicit activity. We screen your wallet using intelligence provided by
          leading blockchain analytics providers. Note that blockchain addresses are publicly-available data that are
          not created or assigned by us or any central party, and by themselves are not personally identifying.
        </li>
        <li>
          Information from localStorage and other tracking technologies. We and our third-party services providers may
          access and collect information from localStorage, mobile deviceID, cookies, web beacons, and other similar
          technologies to provide and personalize the Services and features of the Services for you across sessions. For
          example, we may use this information to remember tokens you import, star, or add to your shopping bag. We may
          also use this information to learn about your preferences, your use of the Services, and our interactions with
          you. Information we collect from these technologies may include things such as browser type, referring/exit
          pages, operating system, device or browser language, and other device information. We group and analyze these
          user journeys collectively, in the aggregate, to improve our product user experience.
        </li>
        <li>
          Information from other sources. We may receive information about your wallet address or transactions made
          through the Services from our service providers in order to comply with our legal obligations and prevent the
          use of our Services in connection with fraudulent or other illicit activities.
        </li>
        <li>
          Survey or usability information. If you participate in a survey or usability study with us, we will record any
          biographical information you directly provide to us (for example, your name, email, and job title), the
          responses you provide to us, and your interactions with the Services.
        </li>
        <li>
          Biographical information. If you apply for a job with us, we collect all information provided through our Jobs
          form, including name, email phone, work and immigration status, and any other resume, cover letter, or free
          form text you include.
        </li>
        <li>
          Correspondence. We will receive any communications and information you provide directly to us via email,
          customer support, social media, or another support channel (such as Twitter or Discord), or when you
          participate in any surveys or questionnaires.
        </li>
      </UlList>
      <SubTitle>How We Share Data</SubTitle>
      <Text>We may share or disclose the data we collect:</Text>
      <UlList>
        <li>
          With service providers. We may share your information with our service providers and vendors to assist us in
          providing, delivering, and improving the Services. For example, we may share your wallet address with service
          providers like Infura and Cloudflare to provide technical infrastructure services, your wallet address with
          blockchain analytics providers to detect, prevent, and mitigate financial crime and other illicit or harmful
          activities, and your activity on our social media pages with our analytics provider to learn more about you
          interact with us and the Services.
        </li>
        <li>
          To comply with our legal obligations. We may share your data in the course of litigation, regulatory
          proceedings, compliance measures, and when compelled by subpoena, court order, or other legal procedure. We
          may also share data when we believe it is necessary to prevent harm to our users, our Company, or others, and
          to enforce our agreements and policies, including our Terms of Service.
        </li>
        <li>
          Safety and Security. We may share data to protect against, investigate, and stop fraudulent, unauthorized, or
          illegal activity. We may also use it to address security risks, solve potential security issues such as bugs,
          enforce our agreements, and protect our users, Company, and ecosystem.
        </li>
        <li>
          Business changes. We may transfer or share data to another entity in the event of a merger, acquisition,
          bankruptcy, dissolution, reorganization, asset or stock sale, or other business transaction.
        </li>
        <li>
          With your consent. We may share your information any other time you provide us with your consent to do so.
        </li>
      </UlList>
      <Text>We do not share your information with any third parties for any marketing purposes whatsoever.</Text>
      <SubTitle>Security</SubTitle>
      <Text>
        We implement and maintain reasonable administrative, physical, and technical security safeguards to help protect
        data from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. Nevertheless,
        transmission via the internet is not completely secure and we cannot guarantee the security of information about
        you. You are responsible for all of your activity on the Services, including the security of your blockchain
        network addresses, cryptocurrency wallets, and their cryptographic keys.
      </Text>
    </InfoPageLayout>
    <Footer />
  </>
)

export default PrivacyPolicyPage
