"use client"
import { configureStore } from '@reduxjs/toolkit'
import faqReducer from './slices/faq'
import user from './slices/user'
import accountReducer from './slices/account'
import izinReducer from './slices/izin'
import mikrotiks from './slices/mikrotiks'
import MikrotikData from './slices/MikrotikData'
import TicketCategoryReducer from './slices/TicketCategory'
import tickets from './slices/tickets'
import ticket from './slices/ticket'
import TicketReply from './slices/TicketReply'
import TicketUser from './slices/TicketUser'
import TicketReplyFilter from './slices/TicketReplyFilter'
import customers from './slices/customer/customers'
import Quotations from './slices/quotation/Quotation'
import Quotation from './slices/quotation/QuotationId'
import app from './slices/app'
import Components from './slices/website/Components'
import Article from './slices/article/Article'
import ArticleCategory from './slices/article/ArticleCategory'
import Products from './slices/product/Products'
import ProductCategories from './slices/product/ProductCategories'
import ProductTypes from './slices/product/ProductTypes'
import Menu from './slices/Menu'
import gallery from './slices/gallery'
import notes from './slices/notes'
import imageSelectorRedux from './slices/imageSelectorRedux'
import SubMenu from './slices/SubMenu'
import Agenda from './slices/agendas'
import MediaAplication from './slices/media_aplication/MediaAplication'
import customerChat from './slices/customer/CustomerChat'
import chat from './slices/chat'
import akses from './slices/akses'

export const store = configureStore({
  reducer: {
    user: user,
    account: accountReducer,
    faq: faqReducer,
    izin: izinReducer,
    mikrotiks: mikrotiks,
    mikrotikdata: MikrotikData,
    ticketcategory: TicketCategoryReducer,
    tickets: tickets,
    ticket: ticket,
    ticketreply: TicketReply,
    ticketuser: TicketUser,
    ticketreplyfilter: TicketReplyFilter,
    customers: customers,
    quotations: Quotations,
    quotation: Quotation,
    app: app,
    Components,
    article: Article,
    articlecategory: ArticleCategory,
    products: Products,
    productcategories: ProductCategories,
    producttypes: ProductTypes,
    menu: Menu,
    gallery: gallery,
    notes: notes,
    imageSelectorRedux,
    SubMenu,
    Agenda,
    MediaAplication,
    customerChat,
    chat,
    akses,
  },
})