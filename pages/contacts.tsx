// error ? <>{error}</>

import React, { FC } from 'react'

import { GetServerSideProps } from 'next'
import Contacts from '../src/components/Contacts'
import { fetchDocumentList, fetchContactList } from '../src/api'
import { Contact, DocumentItem } from '../src/api/types'

interface Props {
  documentList?: DocumentItem[]
  contactList?: Contact[]
  error?: string
}

const ContactsPage: FC<Props> = ({ documentList, contactList, error }) =>
  error ? <>{error}</> : <Contacts documentList={documentList} contactList={contactList} />

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const documentList = await fetchDocumentList()
    const contactList = await fetchContactList()

    return {
      props: { documentList, contactList },
    }
  } catch (error) {
    console.error('error', error.message)
    return {
      props: { error: error.message },
    }
  }
}

export default ContactsPage
