console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}
const namee =  new URLSearchParams(window.location.search).get('firstname');
const emaill =  new URLSearchParams(window.location.search).get('email');
const addresss = new URLSearchParams(window.location.search).get('address');
const cardnamee = new URLSearchParams(window.location.search).get('cardname');
const cardnumberr = new URLSearchParams(window.location.search).get('cardnumber');
let personaldata = () =>{
    const personaldatadiv = document.getElementById('personalData');
    const fullname = document.createElement('h4')
    const fullnametext = document.createTextNode('Full Name : '+namee)
    fullname.appendChild(fullnametext);
    personaldatadiv.appendChild(fullname);

    const email = document.createElement('h4')
    const emailtext = document.createTextNode('Email : '+emaill)
    email.appendChild(emailtext);
    personaldatadiv.appendChild(email);

    const address = document.createElement('h4')
    const addresstext = document.createTextNode('Address : '+addresss)
    address.appendChild(addresstext);
    personaldatadiv.appendChild(address);
}

let paymentdata = () =>{
    const paymentdatadiv = document.getElementById('paymentData');
    const cardname = document.createElement('h4')
    const cardnametext = document.createTextNode('Name on Card : '+cardnamee)
    cardname.appendChild(cardnametext);
    paymentdatadiv.appendChild(cardname);

    const cardnumber = document.createElement('h4')
    const cardnumbertext = document.createTextNode('Credit card number : '+cardnumberr)
    cardnumber.appendChild(cardnumbertext);
    paymentdatadiv.appendChild(cardnumber);
}

let itemdata = (ob,itemCounter) =>{
    const itemDatadiv = document.getElementById('itemData');
    const itemname = document.createElement('h4')
    const itemnametext = document.createTextNode('item : '+ob.name +'  x '+ itemCounter)
    itemname.appendChild(itemnametext);
    itemDatadiv.appendChild(itemname);
}

let totalpayment = (totalAmount) =>{
    const paymentdatadiv = document.getElementById('paymentData');
    const totalpayment = document.createElement('h4')
    const totalpaymenttext = document.createTextNode('total payment : '+totalAmount)
    totalpayment.appendChild(totalpaymenttext);
    paymentdatadiv.appendChild(totalpayment);
}

personaldata();
paymentdata ();

let orderok = () =>{
 location.href ='./orderPlaced.html'
}

document.getElementById("ok").addEventListener("click", orderok);

async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      contentTitle = await response.json();

      let counter = Number(document.cookie.split(',')[1].split('=')[1])

      let item = document.cookie.split(',')[0].split('=')[1].split(" ")

      let i;
      let totalAmount = 0
      for(i=0; i<counter; i++)
      {
          let itemCounter = 1
          for(let j = i+1; j<counter; j++)
          {   
              if(Number(item[j]) == Number(item[i]))
              {
                  itemCounter +=1;
              }
          }
          totalAmount += Number(contentTitle[item[i]-1].price) * itemCounter
          itemdata(contentTitle[item[i]-1],itemCounter)
          i += (itemCounter-1)
      }
      totalpayment(totalAmount)
    } catch (error) {
      console.error(error.message);
    }
  }
  getData('https://5d76bf96515d1a0014085cf9.mockapi.io/product');