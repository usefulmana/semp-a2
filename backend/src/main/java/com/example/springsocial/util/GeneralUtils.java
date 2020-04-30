package com.example.springsocial.util;

import java.nio.ByteBuffer;
import java.util.*;

public class GeneralUtils {

    public static String generateUsername(){
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        return String.format("%06d", number);
    }
    public static UUID generateUUID(){
        return UUID.randomUUID();
    }
    public static String encodeUUIDToBase64(){
        UUID value = generateUUID();
        Base64.Encoder encoder = Base64.getUrlEncoder();
        byte[] src = ByteBuffer.wrap(new byte[16])
                .putLong(value.getMostSignificantBits())
                .putLong(value.getLeastSignificantBits())
                .array();
        return encoder.encodeToString(src);
    }

    public static String decodeUUIDFromBase64(String string){
        Base64.Decoder decoder = Base64.getUrlDecoder();
        byte[] bytes = decoder.decode(string);
        ByteBuffer bb = ByteBuffer.wrap(bytes);
        UUID uuid = new UUID(bb.getLong(), bb.getLong());
        return uuid.toString();
    }

    public static boolean checkPWStrength(String str) {
        /*
         * Minimum eight characters, at least one uppercase letter, one lowercase
         * letter, one number and one special character
         */
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        System.out.println(str.matches(regex));
        return str.matches(regex);
    }

}
