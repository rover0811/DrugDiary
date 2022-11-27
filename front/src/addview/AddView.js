import { React, useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { SpeedDial } from "@rneui/themed";
import SearchText from "../input/SearchText";
import PillCard from "./PillCard";
import PillDetail from "./PillDetail";
import axios from "axios";

const pills = [
  // {
  //   entpName: "삼일제약주",
  //   itemName: "부루펜정200밀리그램이부프로펜",
  //   itemSeq: "197700120",
  //   efcyQesitm:
  //     "이 약은 류마티양 관절염 연소성 류마티양 관절염 골관절염퇴행성 관절질환 감기로 인한 발열 및 동통 요통 월경곤란증 수술후 동통과 강직성 척추염 두통 치통 근육통 신경통 급성통풍 건선성 관절염 연조직손상염좌 좌상 비관절 류마티스질환건염 건초염 활액낭염에 사용합니다",
  //   useMethodQesitm:
  //     "성인은 류마티양 관절염 골관절염 강직성 척추염 연조직손상 비관절 류마티스질환 급성통풍 건선성 관절염에는 1회 13정200600 mg 1일 34회 1일 최고 16정3200 mg까지 복용할 수 있으며 연소성 류마티양 관절염에는 1일 체중 kg당 3040 mg을 34회 분할 복용 경증 및 중등도의 동통이나 감기에는 성인 1회 12정200400 mg 1일 34회 복용합니다",
  //   atpnWarnQesitm: null,
  //   atpnQesitm:
  //     "이 약에 과민증 환자 위장관궤양 위장관출혈 심한 혈액이상 심한 간장애 심한 신장장애 심한 심장기능부전 심한 고혈압 기관지천식 아스피린 또는 다른 소염진통제에 의한 천식 두드러기 알레르기 반응 경험 환자 심장동맥 우회로술 전후 통증발생 환자 임신 말기 3개월 기간의 임부 수유부 항암요법으로 고용량 메토트렉세이트를 투여 중인 환자 갈락토오스 불내성 Lapp 유당분해효소 결핍증 또는 포도당갈락토오스 흡수장애 등의 유전적인 문제가 있는 환자는 이 약을 복용하지 마십시오권장용량을 초과하여 복용하지 마십시오이 약을 복용하기 전에 혈액이상 출혈경향 환자 간경화 간장애 신장장애 심장기능부전 심질환 고혈압 전신홍반루푸스 혼합결합조직질환 궤양성대장염 크론병 노인 만 2세 미만의 소아 임부 수유부 저용량 아스피린을 복용하는 사람 수두인 경우 의사 또는 약사와 상의하십시오감기에 복용할 경우에는 원칙적으로 5일 이내로 복용하며 의사 또는 약사의 지시 없이 통증에 10일 이상성인 또는 5일 이상소아 복용하지 않고 발열에 3일 이상 복용하지 않습니다",
  //   intrcQesitm:
  //     "항암요법으로 고용량 메토트렉세이트를 투여중인 환자 다른 비스테로이드성 소염진통제와 함께 이 약을 복용하지 마십시오이 약을 복용하기 전에 저용량 아스피린 ACE 저해제 복용자 리튬 푸로세미드 및 티아지드계 이뇨제 저용량 메토트렉세이트 쿠마린계 항응혈제와파린 등 선택적 세로토닌 재흡수억제제를 복용하는 환자는 의사 또는 약사와 상의하십시오",
  //   seQesitm:
  //     "쇽 증상호흡곤란 혈압저하 등 헤마토크리트감소 헤모글로빈감소 빈혈 재생불량성빈혈 용혈성빈혈 무과립구증 과립구감소 백혈구감소 혈소판감소 혈소판기능저하 호산구증가 등의 혈액장애 소화성궤양 위장관궤양 위장출혈 천공뚫림 궤양성대장염 혈변 위염 췌장염 혈액구토 크론병 식욕부진 구역 구토 복통 소화불량 설사 위부불쾌감 상복부통증 구갈 구내염 복부팽만감 구강궤양 변비 흑변 피부점막안증후군스티븐스존슨증후군 독성표피괴사용해 빈도불명의 호산구증가 및 전신 증후군을 동반한 약물 발진 혈관신경성 부종 수포성피부염 다형홍반 반구진 발진 피부 붉어짐 물집 발진 급성전신발진물집증 간염 황달 간기능이상 간장애 과민증 또는 아나필락시스 반응 천식발작 두드러기 습진 자주색반점 시각장애 귀먹음 귀울림 미각이상 현기증 졸음 어지러움 우울 두통 뇌혈관사고 또는 신경질 무균성수막염 또는 수막염심한 두통 구역 구토 불면 목이 뻣뻣함 발열 또는 의식장애 급성신부전 소변감소 혈뇨 요단백 BUN 혈중크레아티닌의 상승 고칼륨혈증 간질성 콩팥염 콩팥염증후군 콩팥유두괴사 요량감소 전신부종 및 이에 수반하는 숨가쁨 나른함 눈주변부기 얼굴부기 권태감 발열 코피 부기 말초부종 등이 나타나는 경우 즉각 복용을 중지하고 의사 또는 약사와 상의하십시오",
  //   depositMethodQesitm:
  //     "실온에서 보관하십시오어린이의 손이 닿지 않는 곳에 보관하십시오",
  //   openDe: "20201224 000000",
  //   updateDe: "2021October1st",
  //   itemImage: "http://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/1Mxwka5v45V",
  // },
  // {
  //   entpName: "삼진제약주",
  //   itemName: "게보린정수출명돌로린정",
  //   itemSeq: "197900277",
  //   efcyQesitm:
  //     "이 약은 두통 치통 발치이를 뽑음후 동통통증 인후목구멍통 귀의 통증 관절통 신경통 요허리통 근육통 견통어깨통증 타박통 골절통 염좌통삔 통증 월경통생리통 외상상처통의 진통과 오한춥고 떨리는 증상 발열시의 해열에 사용합니다",
  //   useMethodQesitm:
  //     "성인은 1회 1정 1일 3회까지 공복시를 피해 복용합니다복용간격은 4시간 이상으로 합니다이 약은 원칙적으로 단기간 복용합니다",
  //   atpnWarnQesitm:
  //     "매일 세잔 이상 정기적 음주자가 이 약 또는 다른 해열진통제를 복용할 때는 의사 또는 약사와 상의하십시오 간손상을 일으킬 수 있습니다",
  //   atpnQesitm:
  //     "이 약에 과민증 환자 다른 해열진통제비스테로이드성 소염제 감기약 복용시 천식발작 유발 또는 그 경험자 글루코스6인산 탈수소효소결핍증 급성 간헐성시간 간격을 두고 되풀이하여 포르피린증 과립백혈구감소증 중증 간장애 중증 신장애 출혈 소인 15세 미만의 소아 소화성궤양 심한 혈액 이상 심한 심장기능저하 바르비탈계 약물 삼환계 항우울제 알코올을 복용한 환자는 이 약을 복용하지 마십시오이 약을 복용하기 전에 수두 또는 인플루엔자에 감염되어 있거나 또는 의심되는 15세 이상의 청소년 갑상샘질환 당뇨병 고혈압 몸이 약한 사람 고열 고령자 임부 또는 임신하고 있을 가능성이 있는 여성 수유부 속쓰림 위부불쾌감 위통과 같은 위장문제가 지속 혹은 재발되는 사람 간장애 신장콩팥장애 소화성궤양 혈액이상 출혈경향이 있는 환자 심장기능이상 기관지천식 환자는 의사 또는 약사와 상의하십시오",
  //   intrcQesitm:
  //     "바르비탈계 약물 삼환계 항우울제 다른 소염항염진통제 다른 해열진통제 아세트아미노펜을 포함하는 다른 제품 알코올과 함께 이 약을 복용하지 마십시오이 약을 복용하기 전에 와파린 리튬 티아지드계 이뇨제를 복용한 환자는 의사 또는 약사와 상의하십시오",
  //   seQesitm:
  //     "쇽 증상호흡곤란 온몸이 붉어짐 혈관부기 두드러기 등 천식발작 혈소판 감소 과립구감소 용혈성빈혈 메트헤모글로빈혈증 혈소판기능 저하출혈시간 연장 청색증 구역 구토 식욕부진 위장출혈 소화성궤양 천공뚫림 발진 피부점막안증후군스티븐스존슨증후군 독성표피괴사용해리엘증후군 고열을 수반하며 발진 발적충혈되어 붉어짐 화상모양 수포 등의 격렬한 증상이 전신피부 입 및 눈의 점막에 나타난 경우 전신의 나른함 황달 간질성폐렴기침 숨이참 호흡곤란 발열 간기능이상 고정발진 등이 나타나는 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오",
  //   depositMethodQesitm:
  //     "습기와 빛을 피해 실온에서 보관하십시오어린이의 손이 닿지 않는 곳에 보관하십시오",
  //   openDe: "20201224 000000",
  //   updateDe: "2021January29th",
  //   itemImage: "http://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/1N5PLuAiUvi",
  // },
  // {
  //   entpName: "알파제약주",
  //   itemName: "세가톤트로키염화세칠피리디늄",
  //   itemSeq: "197600539",
  //   efcyQesitm: "이 약은 인두염 편도염 구내염에 의한 염증 완화에 사용합니다",
  //   useMethodQesitm:
  //     "성인은 1회 1정15 mg씩 1일 45회 씹거나 삼키지 말고 입안에서 천천히 녹여 복용합니다연령 증상에 따라 적절히 증감합니다",
  //   atpnWarnQesitm: null,
  //   atpnQesitm:
  //     "3세 이하의 영ㆍ유아는 이 약을 복용하지 마십시오이 약을 복용하기 전에 알레르기성 접촉성 습진 환자 황색4호에 과민증 환자 또는 경험자는 의사 또는 약사와 상의하십시오씹거나 삼키지 말고 침으로 천천히 녹여 복용하며 이 약이 장시간 입안에 머물도록 가능한 한 오래 입안에 물고 있으십시오",
  //   intrcQesitm: null,
  //   seQesitm:
  //     "발진 구강점막의 과민반응두드러기 미란 드물게 구강 및 인두의 작열감 등이 나타나는 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오고열 두통 구역 등이 나타날 수 있습니다",
  //   depositMethodQesitm:
  //     "습기와 빛을 피해 실온에서 보관하십시오어린이의 손이 닿지 않는 곳에 보관하십시오",
  //   openDe: "20210129 000000",
  //   updateDe: "2021January29th",
  //   itemImage: "http://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/1MaAIzBwRVi",
  // },
  // {
  //   entpName: "조아제약주",
  //   itemName: "에바치온캡슐글루타티온",
  //   itemSeq: "199202273",
  //   efcyQesitm: "이 약은 약물중독에 사용합니다",
  //   useMethodQesitm:
  //     "성인은 1회 12캡슐50100 mg 1일 13회 복용합니다연령 증상에 따라 적절히 증감할 수 있습니다",
  //   atpnWarnQesitm: null,
  //   atpnQesitm: null,
  //   intrcQesitm: null,
  //   seQesitm:
  //     "드물게 발진 식욕부진 구역 구토 위통 등이 나타나는 경우 복용을 즉각 중지하고 의사 또는 약사와 상의하십시오",
  //   depositMethodQesitm:
  //     "실온에서 보관하십시오어린이의 손이 닿지 않는 곳에 보관하십시오",
  //   openDe: "20201224 000000",
  //   updateDe: "2021January29th",
  //   itemImage:
  //     "http://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/151577167067000087",
  // },
];

const getPills = async () => {
  console.log("getPills 들어옴");
  try {
    console.log("try 들어옴");
    const api = axios.create({ baseURL: "http://52.78.57.119" });
    console.log("api");
    await api
      .get("/pill/input_name", {
        params: {
          name: "게보린",
        },
      })
      .then((res) => {
        pills.push(res.data.items[0]);
      });
    console.log("데이터 잘 불러옴!!");
  } catch (e) {
    console.log("err");
  }
};

export default function AddView() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });
    if (result.cancelled) {
      return null;
    }
    console.log(result.uri);
    setImageUrl(result.uri);
  };

  const [clickPill, setClickPill] = useState(0);
  const handleClickPill = (pillIndex) => {
    setClickPill(pillIndex);
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white", padding: 18 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        현재 최지우님이 복용하고 있는 약입니다
      </Text>
      <PillCard pills={pills} onPress={handleClickPill} />
      <PillDetail pills={pills} index={clickPill} />
      <SpeedDial
        isOpen={open}
        icon={
          <MaterialCommunityIcons name={"pill"} size={20} color={"white"} />
        }
        openIcon={
          <MaterialCommunityIcons name={"pill"} size={20} color={"white"} />
        }
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color="#1B4B66"
      >
        <SpeedDial.Action
          icon={{ name: "camera", color: "#fff" }}
          title="사진을 찍어서 약 추가하기"
          onPress={uploadImage}
          color="#1B4B66"
        />
        <SpeedDial.Action
          icon={{ name: "search", color: "#fff" }}
          title="검색해서 약 추가하기"
          color="#1B4B66"
          // onPress={() => console.log("Delete Something")}
          onPress={getPills}
        />
      </SpeedDial>
      {/* <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
          onPress={uploadImage}
        >
          <Text style={styles.textStyle}>촬영하여 약 저장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
          // onPress={storeAndCloseModal}
        >
          <Text style={styles.textStyle}>약 직접 입력</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose, { marginBottom: 20 }]}
          // onPress={storeAndCloseModal}
        >
          <Text style={styles.textStyle}>약 바구니로 가기</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: "#1B4B66",
    width: "90%",
    height: 55,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonView: {
    // height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: "center",
  },
});
