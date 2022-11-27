import { ScrollView, Text, StyleSheet } from "react-native";

export default function PillDetail({ pills, index }) {
  return (
    <>
      {pills.length === 0 && (
        <Text style={{ fontSize: 20 }}>복용하고 있는 약을 추가해주세요</Text>
      )}
      {!(pills.length === 0) && (
        <>
          <ScrollView>
            <Text style={styles.pillName}>{pills[index]?.itemName}</Text>
            <Text style={styles.datailHeader}>효능효과</Text>
            <Text>{pills[index]?.efcyQesitm}</Text>
            <Text style={styles.datailHeader}>용법 및 용량</Text>
            <Text>{pills[index]?.useMethodQesitm}</Text>
            <Text style={styles.datailHeader}>&#8251;주의사항</Text>
            <Text style={[styles.datailHeader, { fontSize: 15 }]}>
              - 이 약을 사용하기 전에 반드시 알아야할 내용은 무엇입니까?
            </Text>
            <Text>{pills[index]?.atpnQesitm}</Text>
            <Text style={[styles.datailHeader, { fontSize: 15 }]}>
              - 이 약의 사용상 주의사항은 무엇입니까?
            </Text>
            <Text>{pills[index]?.atpnQesit}</Text>
            <Text style={[styles.datailHeader, { fontSize: 15 }]}>
              - 이 약을 사용하는 동안 주의해야 할 약 또는 음식은 무엇입니까?
            </Text>
            <Text>{pills[index]?.intrcQesitm}</Text>
            <Text style={styles.datailHeader}>부작용</Text>
            <Text>{pills[index]?.seQesitm}</Text>
            <Text style={styles.datailHeader}>보관 방법</Text>
            <Text>{pills[index]?.depositMethodQesitm}</Text>
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pillName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  datailHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
