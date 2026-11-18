import { ReactNode, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Backpack, CalendarDays, Check, Moon, RotateCcw, Sun, UserRound } from "lucide-react-native";
import { schoolItemsByDay } from "../data/schoolItems";
import { useBackpack } from "../hooks/useBackpack";
import { DAYS } from "../types";
import { DaySelector } from "./DaySelector";
import { SchoolItemRow } from "./SchoolItemRow";

type Tab = "backpack" | "week" | "profile";

export function BackpackScreen() {
  const [tab, setTab] = useState<Tab>("backpack");
  const [dark, setDark] = useState(false);
  const insets = useSafeAreaInsets();
  const { checkedItems, selectedDay, selectDay, toggleItem, resetWeek } = useBackpack();
  const items = schoolItemsByDay[selectedDay];
  const checkedCount = items.filter((item) => checkedItems[item.id]).length;
  const isReady = items.length > 0 && checkedCount === items.length;
  const colors = dark
    ? {
        background: "#10201F",
        surface: "#18312E",
        text: "#F7F2E8",
        muted: "#ADC1BB",
        border: "#2C4641",
        nav: "#142825",
      }
    : {
        background: "#F6F1E8",
        surface: "#FFFDF8",
        text: "#17332F",
        muted: "#71827E",
        border: "#E5DDCF",
        nav: "#FFFDF8",
      };

  const allDayCounts = DAYS.map((day) => {
    const dayItems = schoolItemsByDay[day];
    const checked = dayItems.filter((item) => checkedItems[item.id]).length;
    return { day, checked, total: dayItems.length };
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: 104 + insets.bottom,
            paddingLeft: Math.max(20, insets.left + 12),
            paddingRight: Math.max(20, insets.right + 12),
          },
        ]}
      >
        {tab === "backpack" && (
          <>
            <View style={styles.brandRow}>
              <View style={[styles.brandIcon, { backgroundColor: dark ? "#28433E" : "#F8E0D7" }]}>
                <Backpack size={22} color="#F26B4A" strokeWidth={2.4} />
              </View>
              <Text style={[styles.eyebrow, { color: colors.text }]}>MochilaLista</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>Prepara tu mochila</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>Selecciona un día y revisa tus materiales.</Text>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Día de clases</Text>
            <DaySelector selectedDay={selectedDay} onSelectDay={selectDay} dark={dark} />

            {isReady ? (
              <View style={styles.readyCard}>
                <View style={styles.readyIcon}>
                  <Check size={18} color="#FFFFFF" strokeWidth={3} />
                </View>
                <View>
                  <Text style={styles.readyTitle}>Mochila lista</Text>
                  <Text style={styles.readySubtitle}>Ya puedes salir a clases</Text>
                </View>
              </View>
            ) : (
              <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.progressTitle, { color: colors.text }]}>Tu progreso</Text>
                <Text style={[styles.progressCount, { color: "#F26B4A" }]}>{checkedCount}/{items.length}</Text>
                <View style={[styles.progressTrack, { backgroundColor: dark ? "#28433E" : "#EAE1D3" }]}>
                  <View style={[styles.progressFill, { width: `${(checkedCount / items.length) * 100}%` }]} />
                </View>
              </View>
            )}

            <View style={styles.listHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Materiales del {selectedDay.toLowerCase()}</Text>
              <Text style={[styles.itemCount, { color: colors.muted }]}>{items.length} útiles</Text>
            </View>

            <View style={styles.list}>
              {items.map((item) => (
                <SchoolItemRow
                  key={item.id}
                  item={item}
                  checked={checkedItems[item.id] ?? false}
                  onToggle={toggleItem}
                  dark={dark}
                />
              ))}
            </View>
          </>
        )}

        {tab === "week" && (
          <>
            <Text style={[styles.title, { color: colors.text }]}>Tu semana</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>Revisa el avance de cada día.</Text>
            <View style={[styles.weekCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              {allDayCounts.map(({ day, checked, total }, index) => (
                <Pressable
                  key={day}
                  onPress={() => {
                    void Haptics.selectionAsync();
                    selectDay(day);
                    setTab("backpack");
                  }}
                  style={[styles.weekRow, index > 0 && { borderTopColor: colors.border, borderTopWidth: 1 }]}
                >
                  <View style={[styles.weekDayIcon, checked === total ? styles.weekDayComplete : { backgroundColor: dark ? "#28433E" : "#F8E0D7" }]}>
                    {checked === total
                      ? <Check size={17} color="#FFFFFF" strokeWidth={3} />
                      : <CalendarDays size={17} color="#F26B4A" />}
                  </View>
                  <View style={styles.weekText}>
                    <Text style={[styles.weekDay, { color: colors.text }]}>{day}</Text>
                    <Text style={[styles.weekMeta, { color: colors.muted }]}>
                      {checked === total ? "Mochila lista" : `${checked} de ${total} preparados`}
                    </Text>
                  </View>
                  <Text style={[styles.weekCount, { color: checked === total ? "#F26B4A" : colors.muted }]}>
                    {checked}/{total}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {tab === "profile" && (
          <>
            <View style={[styles.profileAvatar, { backgroundColor: dark ? "#28433E" : "#F8E0D7" }]}>
              <UserRound size={38} color="#F26B4A" strokeWidth={2} />
            </View>
            <Text style={[styles.profileName, { color: colors.text }]}>Mi perfil</Text>
            <Text style={[styles.profileSubtitle, { color: colors.muted }]}>Personaliza tu espacio</Text>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Apariencia</Text>
            <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[styles.settingIcon, { backgroundColor: dark ? "#28433E" : "#F9E9BD" }]}>
                {dark ? <Moon size={20} color="#F2B84B" /> : <Sun size={20} color="#C98618" />}
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>{dark ? "Modo oscuro" : "Modo claro"}</Text>
                <Text style={[styles.settingMeta, { color: colors.muted }]}>Cambiar tema de la app</Text>
              </View>
              <Pressable
                accessibilityRole="switch"
                accessibilityState={{ checked: dark }}
                onPress={() => {
                  void Haptics.selectionAsync();
                  setDark((current) => !current);
                }}
                style={[styles.switch, dark && styles.switchActive]}
              >
                <View style={[styles.switchThumb, dark && styles.switchThumbActive]} />
              </Pressable>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Semana</Text>
            <Pressable
              onPress={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                resetWeek();
              }}
              style={({ pressed }) => [
                styles.resetButton,
                { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={styles.resetIcon}>
                <RotateCcw size={20} color="#EF6A72" />
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Reiniciar semana</Text>
                <Text style={[styles.settingMeta, { color: colors.muted }]}>Desmarca todos los útiles</Text>
              </View>
            </Pressable>
          </>
        )}
      </ScrollView>

      <View
        style={[
          styles.bottomNav,
          {
            backgroundColor: colors.nav,
            borderColor: colors.border,
            bottom: Math.max(8, insets.bottom + 6),
            left: Math.max(12, insets.left + 12),
            right: Math.max(12, insets.right + 12),
          },
        ]}
      >
        <NavButton
          label="Mochila"
          active={tab === "backpack"}
          icon={<Backpack size={22} color={tab === "backpack" ? "#F26B4A" : colors.muted} />}
          onPress={() => setTab("backpack")}
        />
        <NavButton
          label="Semana"
          active={tab === "week"}
          icon={<CalendarDays size={22} color={tab === "week" ? "#F26B4A" : colors.muted} />}
          onPress={() => setTab("week")}
        />
        <NavButton
          label="Perfil"
          active={tab === "profile"}
          icon={<UserRound size={22} color={tab === "profile" ? "#F26B4A" : colors.muted} />}
          onPress={() => setTab("profile")}
        />
      </View>
    </SafeAreaView>
  );
}

function NavButton({
  label,
  active,
  icon,
  onPress,
}: {
  label: string;
  active: boolean;
  icon: ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      style={styles.navButton}
    >
      {icon}
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  brandIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 30,
  },
  progressCard: {
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 4,
    padding: 16,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  progressCount: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  progressTrack: {
    borderRadius: 999,
    height: 7,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#F26B4A",
    borderRadius: 999,
    height: "100%",
  },
  readyCard: {
    alignItems: "center",
    backgroundColor: "#F26B4A",
    borderRadius: 18,
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
    padding: 16,
  },
  readyIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  readyTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  readySubtitle: {
    color: "#FFE7DF",
    fontSize: 13,
    marginTop: 2,
  },
  listHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemCount: {
    fontSize: 14,
    marginTop: 30,
  },
  list: {
    gap: 12,
    marginTop: 16,
  },
  weekCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 24,
    overflow: "hidden",
  },
  weekRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  weekDayIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  weekDayComplete: {
    backgroundColor: "#A8C686",
  },
  weekText: {
    flex: 1,
    marginLeft: 12,
  },
  weekDay: {
    fontSize: 16,
    fontWeight: "700",
  },
  weekMeta: {
    fontSize: 13,
    marginTop: 3,
  },
  weekCount: {
    fontSize: 15,
    fontWeight: "800",
  },
  profileAvatar: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 999,
    height: 84,
    justifyContent: "center",
    marginTop: 16,
    width: 84,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 14,
    textAlign: "center",
  },
  profileSubtitle: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  settingsCard: {
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 14,
    padding: 14,
  },
  settingIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  settingMeta: {
    fontSize: 13,
    marginTop: 3,
  },
  switch: {
    backgroundColor: "#CDD3E2",
    borderRadius: 999,
    height: 28,
    justifyContent: "center",
    padding: 3,
    width: 50,
  },
  switchActive: {
    backgroundColor: "#F26B4A",
  },
  switchThumb: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    height: 22,
    width: 22,
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
  resetButton: {
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 14,
    padding: 14,
  },
  resetIcon: {
    alignItems: "center",
    backgroundColor: "#FFECEE",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  bottomNav: {
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    height: 72,
    justifyContent: "space-around",
    left: 16,
    position: "absolute",
    right: 16,
    shadowColor: "#17332F",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 12,
  },
  navButton: {
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    minWidth: 72,
  },
  navLabel: {
    color: "#71827E",
    fontSize: 12,
    fontWeight: "600",
  },
  navLabelActive: {
    color: "#F26B4A",
  },
});
