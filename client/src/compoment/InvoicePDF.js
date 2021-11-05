import React, { useEffect } from 'react';
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const InvoicePDF=({order})=> {
    const styles = StyleSheet.create({
        body: {
          paddingTop: 35,
          paddingBottom: 65,
          paddingHorizontal: 35,
       
        },
        title: {
          fontSize: 24,
          textAlign: "center",
        },
        author: {
          fontSize: 12,
          textAlign: "center",
          marginBottom: 40,
        },
        subtitle: {
          fontSize: 18,
          margin: 12,
        },
        text: {
          margin: 12,
          fontSize: 14,
          textAlign: "justify",
        },
        image: {
          marginVertical: 15,
          marginHorizontal: 100,
        },
        header: {
          fontSize: 12,
          marginBottom: 20,
          textAlign: "center",
          color: "grey",
        },
        footer: {
          padding: "100px",
          fontSize: 12,
          marginBottom: 20,
          textAlign: "center",
          color: "grey",
        },
        pageNumber: {
          position: "absolute",
          fontSize: 12,
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "grey",
        },
      });
    return (

             <Document>
            <Page style={styles.body}>
          <Text style={styles.header} fixed>
            ~ {new Date().toLocaleString()} ~
          </Text>
          <Text style={styles.title}>Hóa đơn mua hàng</Text>
          <Text style={styles.author}>Đặc sản ẩm thực Việt Nam</Text>
          <Text style={styles.subtitle}>Sản phẩm</Text>
    
          <Table>
            <TableHeader>
              <TableCell>Tên</TableCell>
              <TableCell>Gía</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tổng tiền</TableCell>
       
            </TableHeader>
          </Table>
    
          <Table data={order.products}>
            <TableBody>
              <DataTableCell getContent={(x) => x.product.name} />
              <DataTableCell getContent={(x) => `$${x.product.price}`} />
              <DataTableCell getContent={(x) => x.count} />
              <DataTableCell getContent={(x) => ((x.product.price)*(x.count).toLocaleString())} />
             
            </TableBody>
          </Table>
    
          <Text style={styles.text}>
            <Text>
              Địa chỉ: {"               "}
              {order.address}
            </Text>
            {"\n"}
           
            {"\n"}
            <Text>
              Trạng thái: {"  "}
              {order.orderStatus}
            </Text>
            {"\n"}
            <Text>
              Tổng tiền: {"       "}
              {order.totalAfterDiscount ? ((order.totalAfterDiscount).toLocaleString()):((order.cartTotal).toLocaleString())}
            </Text>
          </Text>
    
          <Text style={styles.footer}> ~ Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi ~ </Text>
        </Page>
      </Document>
      
    );
}

export default InvoicePDF;