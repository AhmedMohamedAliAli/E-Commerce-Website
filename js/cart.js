console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxDiv.className = ob.id
    boxDiv.setAttribute('value',itemCounter)
    boxDiv.setAttribute('price', ob.price )
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    boxh4.id = 'price'
    let h4Text = document.createTextNode('Price: EGP  ' + ob.price)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    let amount = document.createElement('h4')
    let amountText = document.createTextNode('Amount: ' + itemCounter)
    amount.appendChild(amountText)
    boxDiv.appendChild(amount)

    let buttonDelete = document.createElement('button')
    buttonDelete.id ='del'
    buttonDeleteText = document.createTextNode('remove')
    buttonDelete.appendChild(buttonDeleteText)
    boxDiv.appendChild(buttonDelete)

    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)

    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Price')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    totalh4.id = 'totalprice'
    let totalh4Text = document.createTextNode(' EGP ' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
}

document.addEventListener("click",(e)=>{
    const Target = e.target.closest("#del"); 
    if(Target){
        const id = e.target.closest('#box').className
        const amount = e.target.closest('#box').getAttribute('value')
        const price = e.target.closest('#box').getAttribute('price')
        const counter = (document.cookie.split(',')[1].split('=')[1])-amount
        const cookieid =(document.cookie.split(',')[0].split('=')[1].split(" ")).filter(a => a !== id)
        const totalprice = Number(document.getElementById("totalprice").innerText.match(/\d+/)[0]);
        e.target.closest('#box').remove();
        document.cookie = "orderId=" + cookieid.join(" ")+ ",counter=" + counter
        document.getElementById("badge").innerHTML = document.cookie.split(',')[1].split('=')[1];
        document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)
        document.getElementById("totalprice").innerText=totalprice - (price * amount);
        if(Number(document.getElementById("totalItem").innerHTML.match(/\d+/)[0]) === 0){
            document.getElementById("cartContainer").remove();
        }


    }
  });

let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = './paymet.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonLink.appendChild(buttonText)


async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      contentTitle = await response.json();

      let counter = Number(document.cookie.split(',')[1].split('=')[1])
      document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

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

          dynamicCartSection(contentTitle[item[i]-1],itemCounter)
          i += (itemCounter-1)
      }
      amountUpdate(totalAmount)

    } catch (error) {
      console.error(error.message);
    }
  }
  getData('https://5d76bf96515d1a0014085cf9.mockapi.io/product');





