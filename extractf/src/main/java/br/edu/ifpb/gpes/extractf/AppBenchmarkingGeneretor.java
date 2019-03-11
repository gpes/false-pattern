package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.models.PatternDetection;
import br.edu.ifpb.gpes.extractf.models.TermsCounter;
import br.edu.ifpb.gpes.extractf.readers.FilePatternDetection;
import br.edu.ifpb.gpes.extractf.readers.FileProjectNames;
import br.edu.ifpb.gpes.extractf.readers.FileTermsCounter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jdom2.JDOMException;
import org.json.JSONObject;

/**
 *
 * @author natan
 */
public class AppBenchmarkingGeneretor {

    public static void main(String[] args) throws JDOMException, IOException {
        FileProjectNames fileProjectNames = new FileProjectNames();
        List<String> readFile = fileProjectNames.readFile();

        readFile.forEach(projectName -> {
            try {
                FilePatternDetection filePatternDetection
                        = new FilePatternDetection(new File(String.format("../output/%s/%s.xml", projectName, projectName)));
                List<PatternDetection> patternDetections = filePatternDetection.readOutput();

                FileTermsCounter fileTermsCounter
                        = new FileTermsCounter(new File(String.format("../output/%s/%s_Matriz.csv", projectName, projectName)));
                List<TermsCounter> termsCounters = fileTermsCounter.consumeOutput();

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("patterns", patternDetections);
                jsonObject.put("terms", termsCounters);

                try (FileWriter fileWriter = new FileWriter(String.format("benchmarking/%s.json", projectName))) {
                    fileWriter.write(jsonObject.toString());
                } finally {
                    System.out.println(projectName + " done!");
                }
            } catch (IOException ex) {
                Logger.getLogger(AppBenchmarkingGeneretor.class.getName()).log(Level.SEVERE, null, ex);
            } catch (JDOMException ex) {
                Logger.getLogger(AppBenchmarkingGeneretor.class.getName()).log(Level.SEVERE, null, ex);
            }

        });

//        System.out.println(readFile);
    }
}
