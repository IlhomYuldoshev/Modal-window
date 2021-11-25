const seePriceOptions = {
  title: "Price",
  closable: true,
  content: "Lorem ipsum",
  width: 300,
  footerButtons: [
    {
      text: "OK",
      type: "primary",
      handler: () => {
        // console.log("Primary btn clicked");
        modalPrice.close();
      },
    },
  ],
};
const deleteItemOptions = {
  title: "Do you want to delete?",
  closable: false,
  content: "",
  width: 600,
  forDel: true,
  footerButtons: [
    {
      text: "OK",
      type: "primary",
      handler: () => {
        // console.log("Primary btn clicked");
        modalDeleteItem.close();
      },
    },
    {
      text: "Cancel",
      type: "danger",
      handler: () => {
        // console.log("Danger btn clicked");
        modalDeleteItem.close();
      },
    },
  ],
};
const fruits = [
  {
    id: 1,
    title: "Apples",
    price: 20,
    img: "https://media.istockphoto.com/photos/red-delicious-apples-picture-id622795204?k=20&m=622795204&s=612x612&w=0&h=ZML1QAmIBvpm6XfQ5hlWR8an4wcFqdY65tdvRhZ9p7I=",
  },
  {
    id: 2,
    title: "Oranges",
    price: 29,
    img: "https://nashzelenyimir.ru/wp-content/uploads/2016/12/%D0%90%D0%BF%D0%B5%D0%BB%D1%8C%D1%81%D0%B8%D0%BD-%D1%84%D0%BE%D1%82%D0%BE.jpg",
  },
  {
    id: 3,
    title: "Lemons",
    price: 17,
    img: "https://st.depositphotos.com/1020804/2370/i/950/depositphotos_23707225-stock-photo-lemons-with-leaves.jpg",
  },
];

const modalPrice = $.modal(seePriceOptions);
const modalDeleteItem = $.modal(deleteItemOptions);

const frukt = $.fruits(fruits);
