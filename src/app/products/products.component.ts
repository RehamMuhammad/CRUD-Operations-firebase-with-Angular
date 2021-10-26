import { Component, OnInit } from '@angular/core';
import { Firestore, collection , collectionData, doc, docData, setDoc, deleteDoc } from'@angular/fire/firestore';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products :any;
  constructor(private firestore : Firestore) { 
    //Read Products collection
    const productsData = collection(firestore, "products")
    collectionData(productsData).subscribe(data => {
      this.products=data;
      console.log(this.products)

      //Read Only one Product
      const documentData = doc(firestore, `products/O3M3pvoUvkAjJ1GAtzNZ`)
      docData(documentData).subscribe(data => console.log(data))

    })
  }

  ngOnInit(): void {
  }

  //Add New Product
  addProduct(){
    setDoc(doc(collection(this.firestore, "products")), {
      title: "Cup",
      price: 30,
      quantity: 6,
      category: "stuff",
      description: "Amazing Mug With different colors"

    })
  }

  //Update an existing Product
  updateProduct(){
    setDoc(doc(this.firestore, "products", "JM7qGfWMaDE4l5Wu12Ua"), {
      quantity: 25,
    } ,   {merge: true}
    )
  }

   //Delete an existing Product
   deleteProduct(){
    deleteDoc(doc(this.firestore, "products", "JM7qGfWMaDE4l5Wu12Ua"))
  }


}
