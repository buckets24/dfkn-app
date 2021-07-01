/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClientModelByOwner = /* GraphQL */ `
  subscription OnCreateClientModelByOwner($owner: String!) {
    onCreateClientModelByOwner(owner: $owner) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const onUpdateClientModelByOwner = /* GraphQL */ `
  subscription OnUpdateClientModelByOwner($owner: String!) {
    onUpdateClientModelByOwner(owner: $owner) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const onDeleteClientModelByOwner = /* GraphQL */ `
  subscription OnDeleteClientModelByOwner($owner: String!) {
    onDeleteClientModelByOwner(owner: $owner) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const onUpdateMeetingModelByEditors = /* GraphQL */ `
  subscription OnUpdateMeetingModelByEditors($editors: [String]!) {
    onUpdateMeetingModelByEditors(editors: $editors) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const onCreateMeetingModelByOwner = /* GraphQL */ `
  subscription OnCreateMeetingModelByOwner($owner: String!) {
    onCreateMeetingModelByOwner(owner: $owner) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const onUpdateMeetingModelByOwner = /* GraphQL */ `
  subscription OnUpdateMeetingModelByOwner($owner: String!) {
    onUpdateMeetingModelByOwner(owner: $owner) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const onDeleteMeetingModelByOwner = /* GraphQL */ `
  subscription OnDeleteMeetingModelByOwner($owner: String!) {
    onDeleteMeetingModelByOwner(owner: $owner) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const onCreateOnlineDocumentModelByEditors = /* GraphQL */ `
  subscription OnCreateOnlineDocumentModelByEditors($editors: [String]!) {
    onCreateOnlineDocumentModelByEditors(editors: $editors) {
      id
      title
      type
      status
      values
      clientId
      contractor
      owner
      editors
      isVisibleToClient
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      patches {
        nextToken
      }
    }
  }
`;
export const onUpdateOnlineDocumentModelByEditors = /* GraphQL */ `
  subscription OnUpdateOnlineDocumentModelByEditors($editors: [String]!) {
    onUpdateOnlineDocumentModelByEditors(editors: $editors) {
      id
      title
      type
      status
      values
      clientId
      contractor
      owner
      editors
      isVisibleToClient
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      patches {
        nextToken
      }
    }
  }
`;
export const onCreateDocumentPatchByDocumentId = /* GraphQL */ `
  subscription OnCreateDocumentPatchByDocumentId($documentId: ID!) {
    onCreateDocumentPatchByDocumentId(documentId: $documentId) {
      id
      patch
      documentId
      uniqueEditorInstance
      author
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClientActivityModel = /* GraphQL */ `
  subscription OnCreateClientActivityModel($owner: String, $editors: String) {
    onCreateClientActivityModel(owner: $owner, editors: $editors) {
      id
      clientId
      dueDate
      description
      done
      priority
      editors
      createdAt
      owner
      updatedBy
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateClientActivityModel = /* GraphQL */ `
  subscription OnUpdateClientActivityModel($owner: String, $editors: String) {
    onUpdateClientActivityModel(owner: $owner, editors: $editors) {
      id
      clientId
      dueDate
      description
      done
      priority
      editors
      createdAt
      owner
      updatedBy
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteClientActivityModel = /* GraphQL */ `
  subscription OnDeleteClientActivityModel($owner: String, $editors: String) {
    onDeleteClientActivityModel(owner: $owner, editors: $editors) {
      id
      clientId
      dueDate
      description
      done
      priority
      editors
      createdAt
      owner
      updatedBy
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateAgentModel = /* GraphQL */ `
  subscription OnCreateAgentModel($sub: String, $owner: String) {
    onCreateAgentModel(sub: $sub, owner: $owner) {
      id
      sub
      firstName
      lastName
      salutation
      email
      phone
      streetHouseNumber
      postCode
      place
      role
      subsidiary
      active
      cognitoStatus
      status
      owner
      createdAt
      updatedAt
      meetingsAsModerator {
        nextToken
      }
    }
  }
`;
export const onUpdateAgentModel = /* GraphQL */ `
  subscription OnUpdateAgentModel($sub: String, $owner: String) {
    onUpdateAgentModel(sub: $sub, owner: $owner) {
      id
      sub
      firstName
      lastName
      salutation
      email
      phone
      streetHouseNumber
      postCode
      place
      role
      subsidiary
      active
      cognitoStatus
      status
      owner
      createdAt
      updatedAt
      meetingsAsModerator {
        nextToken
      }
    }
  }
`;
export const onDeleteAgentModel = /* GraphQL */ `
  subscription OnDeleteAgentModel($sub: String, $owner: String) {
    onDeleteAgentModel(sub: $sub, owner: $owner) {
      id
      sub
      firstName
      lastName
      salutation
      email
      phone
      streetHouseNumber
      postCode
      place
      role
      subsidiary
      active
      cognitoStatus
      status
      owner
      createdAt
      updatedAt
      meetingsAsModerator {
        nextToken
      }
    }
  }
`;
export const onCreateClientModel = /* GraphQL */ `
  subscription OnCreateClientModel(
    $owner: String
    $sub: String
    $editors: String
  ) {
    onCreateClientModel(owner: $owner, sub: $sub, editors: $editors) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const onUpdateClientModel = /* GraphQL */ `
  subscription OnUpdateClientModel(
    $owner: String
    $sub: String
    $editors: String
  ) {
    onUpdateClientModel(owner: $owner, sub: $sub, editors: $editors) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const onDeleteClientModel = /* GraphQL */ `
  subscription OnDeleteClientModel(
    $owner: String
    $sub: String
    $editors: String
  ) {
    onDeleteClientModel(owner: $owner, sub: $sub, editors: $editors) {
      id
      sub
      firstName
      lastName
      salutation
      email
      telephone
      fax
      mobile
      maritalStatus
      country
      streetHouseNumber
      postCode
      place
      addressValidDate
      birthPlace
      birthday
      title
      nationality
      taxId
      emailVerified
      active
      contractor {
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
      }
      subsidiary
      cognitoStatus
      status
      owner
      editors
      productInfoImmposparen {
        oneTimeInvestment
        proportionalInvestment
      }
      createdAt
      updatedAt
      meetings {
        nextToken
      }
      onlineDocuments {
        nextToken
      }
      agentDocuments {
        nextToken
      }
    }
  }
`;
export const onCreateMeetingModel = /* GraphQL */ `
  subscription OnCreateMeetingModel($owner: String, $editors: String) {
    onCreateMeetingModel(owner: $owner, editors: $editors) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const onUpdateMeetingModel = /* GraphQL */ `
  subscription OnUpdateMeetingModel($owner: String, $editors: String) {
    onUpdateMeetingModel(owner: $owner, editors: $editors) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const onDeleteMeetingModel = /* GraphQL */ `
  subscription OnDeleteMeetingModel($owner: String, $editors: String) {
    onDeleteMeetingModel(owner: $owner, editors: $editors) {
      id
      owner
      meetingDateTime
      moderatorId
      moderatorName
      clientId
      editors
      activeDocumentId
      scrollPos
      scrollPosPercent
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      guestAgents {
        nextToken
      }
    }
  }
`;
export const onCreateGuestAgentMeetingModel = /* GraphQL */ `
  subscription OnCreateGuestAgentMeetingModel {
    onCreateGuestAgentMeetingModel {
      id
      meetingId
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGuestAgentMeetingModel = /* GraphQL */ `
  subscription OnUpdateGuestAgentMeetingModel {
    onUpdateGuestAgentMeetingModel {
      id
      meetingId
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGuestAgentMeetingModel = /* GraphQL */ `
  subscription OnDeleteGuestAgentMeetingModel {
    onDeleteGuestAgentMeetingModel {
      id
      meetingId
      agentId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOnlineDocumentModel = /* GraphQL */ `
  subscription OnCreateOnlineDocumentModel($owner: String, $editors: String) {
    onCreateOnlineDocumentModel(owner: $owner, editors: $editors) {
      id
      title
      type
      status
      values
      clientId
      contractor
      owner
      editors
      isVisibleToClient
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      patches {
        nextToken
      }
    }
  }
`;
export const onUpdateOnlineDocumentModel = /* GraphQL */ `
  subscription OnUpdateOnlineDocumentModel($owner: String, $editors: String) {
    onUpdateOnlineDocumentModel(owner: $owner, editors: $editors) {
      id
      title
      type
      status
      values
      clientId
      contractor
      owner
      editors
      isVisibleToClient
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      patches {
        nextToken
      }
    }
  }
`;
export const onDeleteOnlineDocumentModel = /* GraphQL */ `
  subscription OnDeleteOnlineDocumentModel($owner: String, $editors: String) {
    onDeleteOnlineDocumentModel(owner: $owner, editors: $editors) {
      id
      title
      type
      status
      values
      clientId
      contractor
      owner
      editors
      isVisibleToClient
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
      patches {
        nextToken
      }
    }
  }
`;
export const onCreateDocumentPatch = /* GraphQL */ `
  subscription OnCreateDocumentPatch {
    onCreateDocumentPatch {
      id
      patch
      documentId
      uniqueEditorInstance
      author
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDocumentPatch = /* GraphQL */ `
  subscription OnUpdateDocumentPatch {
    onUpdateDocumentPatch {
      id
      patch
      documentId
      uniqueEditorInstance
      author
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDocumentPatch = /* GraphQL */ `
  subscription OnDeleteDocumentPatch {
    onDeleteDocumentPatch {
      id
      patch
      documentId
      uniqueEditorInstance
      author
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOnlineDocumentArchiveModel = /* GraphQL */ `
  subscription OnCreateOnlineDocumentArchiveModel(
    $owner: String
    $editors: String
  ) {
    onCreateOnlineDocumentArchiveModel(owner: $owner, editors: $editors) {
      id
      documentId
      title
      type
      values
      clientId
      contractor
      owner
      editors
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateOnlineDocumentArchiveModel = /* GraphQL */ `
  subscription OnUpdateOnlineDocumentArchiveModel(
    $owner: String
    $editors: String
  ) {
    onUpdateOnlineDocumentArchiveModel(owner: $owner, editors: $editors) {
      id
      documentId
      title
      type
      values
      clientId
      contractor
      owner
      editors
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteOnlineDocumentArchiveModel = /* GraphQL */ `
  subscription OnDeleteOnlineDocumentArchiveModel(
    $owner: String
    $editors: String
  ) {
    onDeleteOnlineDocumentArchiveModel(owner: $owner, editors: $editors) {
      id
      documentId
      title
      type
      values
      clientId
      contractor
      owner
      editors
      version
      createdAt
      updatedAt
      client {
        id
        sub
        firstName
        lastName
        salutation
        email
        telephone
        fax
        mobile
        maritalStatus
        country
        streetHouseNumber
        postCode
        place
        addressValidDate
        birthPlace
        birthday
        title
        nationality
        taxId
        emailVerified
        active
        subsidiary
        cognitoStatus
        status
        owner
        editors
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateSignatureTokenModel = /* GraphQL */ `
  subscription OnCreateSignatureTokenModel {
    onCreateSignatureTokenModel {
      id
      pin
      documentId
      fieldName
      authorId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSignatureTokenModel = /* GraphQL */ `
  subscription OnUpdateSignatureTokenModel {
    onUpdateSignatureTokenModel {
      id
      pin
      documentId
      fieldName
      authorId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSignatureTokenModel = /* GraphQL */ `
  subscription OnDeleteSignatureTokenModel {
    onDeleteSignatureTokenModel {
      id
      pin
      documentId
      fieldName
      authorId
      createdAt
      updatedAt
    }
  }
`;
