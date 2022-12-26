import React from 'react'

import styled from '@emotion/styled'
import { NextPage } from 'next'
import Link from 'next/link'

import Footer from 'app/components/footer'
import Header from 'app/components/header'
import InfoPageLayout from 'app/components/info-page-layout'
import UlList from 'app/components/list'
import PageBackground from 'app/components/page-background'

const SubTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: normal;
`

const Text = styled.p`
  font-size: 12px;
  text-align: justify;
  margin-bottom: 12px;
`

const TextLink = styled(Link)`
  color: ${({ theme }): string => theme.colors.border.primaryOnDark};
`

const TermsOfUsePage: NextPage = () => (
  <>
    <Header />
    <PageBackground>
      <InfoPageLayout heading='TERMS OF USE'>
        <SubTitle>1. General Provisions</SubTitle>
        <Text>
          1.1. This Agreement establishes the sequence for the provision of services related to the exchange operation
          of electronic money using the resources of the online service.
        </Text>
        <Text>
          1.2. An online service means an online platform for the exchange of virtual funds hosted on the Internet -
          <TextLink href='cherryblossomswap.com'>cherryblossomswap.com</TextLink>.
        </Text>
        <Text>
          1.3. User - a private or legal entity that has expressed a desire to use the functions of the CherrySwap
          online service.
        </Text>
        <Text>
          1.4. The CherrySwap user and web resource, when referred to collectively, will be referred to as the
          &quot;Parties&quot;.
        </Text>
        <Text>
          1.5. The Parties agree that this Agreement, in electronic form, has the same legal force as a paper document
          governing all relations between the User (individual and legal entity) and the party providing services of a
          certain type (CherrySwap).
        </Text>
        <Text>
          1.6. The Agreement is a public offer that the User draws up by submitting an application on the platform of
          the CherrySwap online service to receive services provided by the CherrySwap online service.
        </Text>
        <SubTitle>2. Object of the Agreement</SubTitle>
        <Text>
          2.1. The CherrySwap online resource provides the services specified in paragraph 4 of this Agreement, subject
          to the User&apos;s compliance with all the conditions specified in paragraph 9 of this Agreement. The
          procedure for their provision is determined by the internal Regulations of the CherrySwap online resource,
          written in paragraph 5.
        </Text>
        <Text>
          2.2. The User receives the services of the CherrySwap online resource and pays for them in compliance with all
          the conditions defined by the Agreement.
        </Text>
        <SubTitle>3. Rights and obligations of the Parties</SubTitle>
        <Text>3.1. The CherrySwap online service must:</Text>

        <Text>
          3.1.1. Perform the conversion of electronic money of such Internet payment systems as: Qiwi, Payeer, Perfect
          Money, Yandex.Money, other online services adhering to the standards listed in the Agreement.
        </Text>
        <Text>
          3.1.2. Provide any technical and informational assistance to Users in the process of conducting transactions
          using the functions of the CherrySwap online service.
        </Text>
        <Text>
          3.1.3. Ensure the preservation of all information about the exchange transactions carried out (personal data
          of Users, dates and times of exchange operations, their size, etc.) and issue it to the Users who have carried
          out these exchanges. Information about virtual transfers in different directions, using the functionality of
          the payment system, has the status of &quot;Confidential&quot; and is not subject to disclosure to third
          parties.
        </Text>
        <Text>
          3.1.4. Do not give information about the conversions to third parties. An exception would be if:
          <UlList>
            <li />
            <li>
              a judicial organization located at the location of the CherrySwap online service has issued an official
              decision that is legally binding;{' '}
            </li>
            <li>
              a request has been received from official law enforcement organizations, financial surveillance
              institutions performing work at the location of the CherrySwap online service;{' '}
            </li>
            <li>the administrations of the partners (Internet payment systems) registered earlier applied.</li>
          </UlList>
        </Text>
        <Text>3.1.5. Take into account information about discounts given to Users.</Text>
        <Text>
          3.1.6. Ensure the receipt of money to the account of the User or another entity within 24 hours from the
          receipt of the complaint in the circumstances described in paragraphs 3.2.5, 5.4, 5.5, 5.6 of this Agreement.
        </Text>
        <Text>3.2. The user is obliged:</Text>
        <Text>3.2.1. Give real information, details, so that transactions are carried out in a timely manner.</Text>
        <Text>3.2.2. Show the exact details of your personal email address.</Text>
        <Text>
          3.2.3. Provide the ability to send system alerts to e-mail. Own access to the Internet using a laptop,
          computer, tablet or other equipment. Use the latest versions of anti-virus products to establish a secure
          connection with the CherrySwap online resource platform.
        </Text>
        <Text>3.2.4. Adhere to all terms of the Agreement.</Text>
        <Text>
          3.2.5. Notify the management of the CherrySwap Internet resource of any cases when the transferred amounts
          have not been fully or partially transferred to the account of the User, a third party. Also report cases that
          are listed in paragraphs 5.4, 5.5, 5.6 of this Agreement. The application must be sent to technical support
          within 30 or 31 days from the moment the situation occurs when the virtual funds must be credited to the
          account. If this condition is not met, the disputed amounts remain at the disposal of the CherrySwap online
          service.
        </Text>
        <Text>3.2.6. Be guided by legislative acts that regulate the rules for conducting transactions online.</Text>
        <Text>3.2.7. Do not use different Internet systems that allow you to make any traffic cheats.</Text>
        <Text>3.3. The CherrySwap online service has the right to:</Text>
        <Text>
          3.3.1. Temporarily limit work if the online service is being upgraded or when errors in the site are being
          corrected.
        </Text>
        <Text>
          3.3.2. In the event that official law enforcement organizations, administrations of the payment systems listed
          above apply, Users claim for fraudulent activity, temporarily suspend any transactions until all details are
          clarified.
        </Text>
        <Text>3.3.3. Determine at your own discretion the percentage of discount on transactions.</Text>
        <Text>3.3.4. Set the amount of the commission to be deducted for the transactions performed.</Text>
        <Text>3.3.5. Deny a potential User the provision of services without explaining their actions.</Text>
        <Text>
          3.3.6. Receive from the User information confirming the exchange process using e-mail, cell phone, a
          screenshot of the payment, in cases where the transaction was completed by an error.
        </Text>
        <Text>
          3.3.7. Stop communicating with a User who is rude, asks questions, off topic, does not provide the necessary
          information to the technical support service.
        </Text>
        <Text>3.3.8. Suspend the transaction, based on clauses 5.4, 5.5, 5.6.</Text>
        <Text>
          3.3.9. Block the implementation of the transaction and not give funds to the User until his identity is
          identified.
        </Text>
        <Text>
          3.3.10. If the User does not comply with the obligations assumed in clause 3.2.7, the management may block the
          User who violated this clause, as well as the source of transitions for traffic boost.
        </Text>
        <Text>
          3.3.11. In case of unjustified enrichment by the User with virtual, monetary funds of the CherrySwap online
          service or third-party services exchanging electronic money, the Administration of the{' '}
          <TextLink href='cherryblossomswap.com'>cherryblossomswap.com</TextLink>
          website reserves the right to block the execution of the application until the reasons and circumstances are
          clarified, as well as to reimburse illegally acquired funds and confirm property the rights to them of the
          CherrySwap online service or other exchangers.
        </Text>
        <SubTitle>4. Services provided</SubTitle>

        <Text>
          4.1. The CherrySwap online service performs the exchange of money of such payment systems as: Bitcoin, Qiwi,
          Payeer, Perfect Money, Yandex.Money and others using the banking organizations indicated on the site.
        </Text>
        <Text>
          4.2. The CherrySwap online service is not obliged to verify the legality of the User&apos;s possession of the
          funds used in the transaction process.
        </Text>
        <SubTitle>5. Regulations for the exchange of electronic funds</SubTitle>

        <Text>
          5.1. The exchange begins from the moment the User credits the funds to be exchanged. If the money is not
          received within 20 minutes from the moment the application was created, it is automatically deleted by the
          security service of the <TextLink href='cherryblossomswap.com'>cherryblossomswap.com</TextLink> exchange site.
          If the receipt of funds for a placed order occurs in excess of the specified time (1 hour 30 minutes for
          cryptocurrency), it is processed at the rate current at the time the electronic money is credited from the
          User.
        </Text>
        <Text>
          5.2. The operation is considered completed after the money is credited to the account provided by the User.
        </Text>
        <Text>
          5.3. The user will not be able to cancel an already started transaction, return the funds sent for the
          exchange.
        </Text>
        <Text>
          5.4. If the User has credited an amount that differs from that specified in the order, then the CherrySwap
          online resource system has the right to slow down the exchange process completely, or recalculate the
          operation according to the funds received. In the event of blocking the operation, only after the User
          contacts technical support based on clause 3.2.5 of this Agreement, the CherrySwap online resource will
          transfer the actually received funds at the rate that was in effect at the time of the operation.
        </Text>
        <Text>
          5.5. If the User has entered non-working, blocked account details, then the transaction is stopped and the
          money is credited to the User&apos;s account based on the submitted application to technical support in
          accordance with clause 3.2.5.
        </Text>
        <Text>
          5.6. If the User has changed the notes to the transaction, has paid the invoice from a third-party account,
          then the operations may be blocked. In such a situation, the return of virtual funds is made only after the
          User&apos;s application in accordance with clause 3.2.5.
        </Text>
        <Text>
          5.7. When the User receives the Bitcoin cryptocurrency, the time for confirming the operation (receipt of
          funds) depends on the Bitcoin online system itself. This can take from 15 minutes to several days, it all
          depends on the load of the Bitcoin network. The exchange Internet service is not responsible for the speed of
          transactions and receipt of confirmation from the Bitcoin network.
        </Text>
        <Text>5.8. In any case, when a refund is made, a commission of 5% is withheld, except for clause 10.11.</Text>
        <SubTitle>6. Guarantees and liability of the Parties</SubTitle>

        <Text>
          6.1. The CherrySwap online resource is not fully responsible (material and moral) for the incorrect use of the
          service functions by the User, as well as mistakes made in the process of filling out any items of the usual
          transaction application form. Even if the money was transferred to the wrong account, the cancellation of the
          operation or the return of funds is not carried out.
        </Text>
        <Text>
          6.2. The CherrySwap online service is not responsible for damage, any losses, if the reason for their
          occurrence was the inability of the User to use the relevant equipment as a whole or its individual
          components.
        </Text>
        <Text>
          6.3. The CherrySwap online service is not responsible for the operation of banking companies or payment
          systems, which resulted in errors and delays in transactions.
        </Text>
        <Text>
          6.4. The CherrySwap online service is not responsible for the costs incurred by the User, losses, lost
          profits, if they were caused by the User&apos;s erroneous knowledge of tariffs, profitability of operations,
          and other personal situations.
        </Text>
        <Text>
          6.5. The CherrySwap online service is not responsible for the various types of costs incurred due to errors
          and delays in the execution of electronic transactions.
        </Text>
        <Text>
          6.6. The user certifies that he is the legal owner or has the legal right to use the funds that will be
          involved in exchange transactions.
        </Text>
        <Text>
          6.7. The User agrees to reimburse losses to third parties that occurred indirectly or directly related to the
          use of the functionality of the online service by the User.
        </Text>
        <Text>
          6.8. The User guarantees that in any interaction with the CherrySwap Online Service, he has already reached
          the age of majority, in accordance with the laws of the country where the User is located.
        </Text>
        <SubTitle>7. Changing information</SubTitle>
        <Text>
          7.1. The management of the CherrySwap online resource has the right to supplement or change this Agreement at
          any time. At the same time, they come into force after their publication on the web resource.
        </Text>
        <SubTitle>8. Force majeure</SubTitle>
        <Text>
          8.1. The Parties are released from liability for the impossibility of fulfillment, delay in the fulfillment of
          their obligations under the concluded Agreement, in the event of circumstances of unforeseen force. They
          concern: natural disasters, legal acts coming from the authorities, ongoing wars, fires, explosions during a
          terrorist attack, mass riots, cyber attacks on the site, civil unrest. They also include the absence, failure
          in the functioning of power supply, access to the Internet, communication services.
        </Text>
        <SubTitle>9. Mandatory conditions for conducting exchange transactions</SubTitle>

        <Text>
          9.1. It is forbidden to use the resources of the CherrySwap online service system for illegal or fraudulent
          operations. The user agrees that for any attempts to exchange funds, the origin of which is in doubt, he will
          be liable in accordance with the laws of the state where the exchange transaction was made.
        </Text>
        <Text>
          9.2. The CherrySwap online service has the right to transfer data on illegal monetary transactions, if their
          illegality is appropriately justified by the competent organizations, the management of payment systems, from
          the victim, based on the application submitted by him.
        </Text>
        <Text>
          9.3. A prerequisite for the implementation of the operation is the deduction by the User of money from a
          personal electronic wallet. At the same time, the User is responsible for the legality of the sources of
          receipt of virtual funds, since the CherrySwap online service is not obliged to control and verify their
          origin.
        </Text>
        <Text>
          9.4. The CherrySwap online service is not responsible for transactions that are performed by third parties
          with the permission or instruction of the User.
        </Text>
        <Text>
          9.5. The user, after clicking the &quot;I agree with the exchange rules&quot; button, confirms that he
          unconditionally accepts the conditions listed in this Agreement.
        </Text>

        <SubTitle>10. User identification</SubTitle>

        <Text>
          10.1. The online service may require (oblige the User) at any time from the User to undergo an identification
          procedure, and the User is obliged to go through it.
        </Text>
        <Text>
          10.2 When going through the personal identification procedure, the service has the right to request any
          documents and / or personal data confirming the user&apos;s identity to the extent necessary, determined by
          the Online service.
        </Text>
        <Text>
          8.3 The Online Service may require photos of the User with identity documents, bank cards and other necessary
          materials and to the extent necessary.
        </Text>
        <Text>
          10.4 When carrying out personal identification, the Service has the right to use the services of third-party
          services that specialize in this procedure. This is a legal case in which the Online Service has the right to
          transfer the User&apos;s data to a third party. The user understands this clause and accepts this rule.
        </Text>
        <Text>
          10.5 After passing the identification procedure, the User must independently control the relevance of this
          information. In case of any changes, the User must inform the technical support service about this in order to
          avoid possible difficulties and problems in the further use of the Online Service.
        </Text>
        <Text>
          10.6 In cases where the Administration of the Online Service cannot contact the User using the contact details
          specified by the User on the website when registering or forming an application, the Service has the right to
          suspend any exchange transactions. At the same time, the Online Service does not bear any responsibility for
          possible losses that the User may incur, and the Online Service is not responsible for any negative
          consequences.
        </Text>
        <Text>
          10.7 By going through the identification procedure, the User gives his consent to the Online Service to
          conduct any research and verification in relation to him.
        </Text>
        <Text>
          10.8 All Internet addresses of wallets of ongoing transactions on the Online Service are subject to automatic
          AML verification.
        </Text>
        <Text>
          10.9 The online service has the right to require the User to carry out an identification procedure if the
          client&apos;s wallet Internet address specified in the application is associated with the following
          definitions:
        </Text>
        <Text>
          -Darknet Marketplace; -Darknet Service; - Illegal Service; -Mixing Service; -Fraudulent Exchange; - ransom;
          -Scam; -Stolen Coins.
        </Text>
        <Text>
          10.10 In the event that the connections are identified, then only after the User has passed the
          identification, the funds will be returned to the sender&apos;s address.
        </Text>
        <Text>10.11 Funds will be returned to the sender&apos;s details minus a commission of 10%.</Text>
      </InfoPageLayout>
    </PageBackground>
    <Footer />
  </>
)

export default TermsOfUsePage
